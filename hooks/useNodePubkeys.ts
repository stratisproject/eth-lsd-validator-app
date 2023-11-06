import {
  getNodeDepositContract,
  getNodeDepositContractAbi,
} from "config/contract";
import {
  ChainPubkeyStatus,
  NodePubkeyInfo,
  PubkeyStatusType,
} from "interfaces/common";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getPubkeyDisplayStatus } from "utils/commonUtils";
import { getEthWeb3 } from "utils/web3Utils";
import { useAppSlice } from "./selector";
import { useUnmatchedToken } from "./useUnmatchedToken";

export const useNodePubkeys = (
  nodeAddress: string | undefined,
  page: number,
  pubkeyStatusTypes?: PubkeyStatusType[]
) => {
  const { updateFlag } = useAppSlice();
  const [totalCount, setTotalCount] = useState<number>();

  const [pendingCount, setPendingCount] = useState<number>();
  const [activeCount, setActiveCount] = useState<number>();
  const [exitedCount, setExitedCount] = useState<number>();
  const [othersCount, setOthersCount] = useState<number>();

  const [nodePubkeyInfos, setNodePubkeyInfos] = useState<NodePubkeyInfo[]>([]);
  const [displayPubkeyInfos, setDisplayPubkeyInfos] = useState<
    NodePubkeyInfo[]
  >([]);

  const [requestFirstTime, setRequestFirstTime] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { unmatchedEth } = useUnmatchedToken();

  useEffect(() => {
    let remainingTokenAmount =
      !unmatchedEth || isNaN(Number(unmatchedEth)) ? 0 : Number(unmatchedEth);

    let activeCount = 0;
    let pendingCount = 0;
    let exitedCount = 0;
    let othersCount = 0;

    const resList: NodePubkeyInfo[] = [];

    nodePubkeyInfos.forEach((item) => {
      const displayStatus = getPubkeyDisplayStatus(item, remainingTokenAmount);
      item.displayStatus === displayStatus;
      let canStake = false;
      if (
        item._status === ChainPubkeyStatus.Match &&
        remainingTokenAmount >= 31
      ) {
        remainingTokenAmount -= 31;
        canStake = true;
      }

      const newItem = { ...item, displayStatus, canStake };

      const isActive =
        item._status === ChainPubkeyStatus.Staked &&
        (item.beaconApiStatus === "ACTIVE_ONGOING" ||
          item.beaconApiStatus === "ACTIVE_EXITING" ||
          item.beaconApiStatus === "ACTIVE_SLASHED" ||
          item.beaconApiStatus === "ACTIVE");

      const isPending =
        item._status === ChainPubkeyStatus.Staked &&
        (item.beaconApiStatus === undefined ||
          item.beaconApiStatus === "PENDING_INITIALIZED" ||
          item.beaconApiStatus === "PENDING_QUEUED" ||
          item.beaconApiStatus === "PENDING");

      const isExit =
        item._status === ChainPubkeyStatus.Staked &&
        (item.beaconApiStatus === "EXITED_UNSLASHED" ||
          item.beaconApiStatus === "EXITED_SLASHED" ||
          item.beaconApiStatus === "EXITED");

      const isOthers = !isActive && !isPending && !isExit;

      if (isActive) {
        activeCount++;
        if (
          !pubkeyStatusTypes ||
          pubkeyStatusTypes.length === 0 ||
          pubkeyStatusTypes.indexOf(PubkeyStatusType.Active) >= 0
        ) {
          resList.push(newItem);
        }
      } else if (isPending) {
        pendingCount++;
        if (
          !pubkeyStatusTypes ||
          pubkeyStatusTypes.length === 0 ||
          pubkeyStatusTypes.indexOf(PubkeyStatusType.Pending) >= 0
        ) {
          resList.push(newItem);
        }
      } else if (isExit) {
        exitedCount++;
        if (
          !pubkeyStatusTypes ||
          pubkeyStatusTypes.length === 0 ||
          pubkeyStatusTypes.indexOf(PubkeyStatusType.Exited) >= 0
        ) {
          resList.push(newItem);
        }
      } else {
        othersCount++;
        if (
          !pubkeyStatusTypes ||
          pubkeyStatusTypes.length === 0 ||
          pubkeyStatusTypes.indexOf(PubkeyStatusType.Others) >= 0
        ) {
          resList.push(newItem);
        }
      }
    });

    setDisplayPubkeyInfos(resList);
    setActiveCount(activeCount);
    setPendingCount(pendingCount);
    setExitedCount(exitedCount);
    setOthersCount(othersCount);
    setTotalCount(nodePubkeyInfos.length);
  }, [nodePubkeyInfos, pubkeyStatusTypes, unmatchedEth]);

  const showLoading = useMemo(() => {
    return (
      requestFirstTime &&
      // || (refreshing && nodePubkeyInfos.length === 0)
      nodeAddress
    );
  }, [requestFirstTime, nodeAddress, refreshing, displayPubkeyInfos]);

  const showEmptyContent = useMemo(() => {
    return displayPubkeyInfos.length === 0 && !showLoading;
  }, [showLoading, displayPubkeyInfos]);

  const updateData = useCallback(async () => {
    if (!nodeAddress) {
      setTotalCount(undefined);
      setActiveCount(undefined);
      setPendingCount(undefined);
      setExitedCount(undefined);
      setOthersCount(undefined);
      setNodePubkeyInfos([]);
      return;
    }

    try {
      setRefreshing(true);
      const web3 = getEthWeb3();

      const nodeDepositContract = new web3.eth.Contract(
        getNodeDepositContractAbi(),
        getNodeDepositContract(),
        {
          from: nodeAddress,
        }
      );

      const pubkeysOfNode = await nodeDepositContract.methods
        .getPubkeysOfNode(nodeAddress)
        .call()
        .catch((err: any) => {
          console.log({ err });
        });

      const requests = pubkeysOfNode?.map((pubkeyAddress: string) => {
        return (async () => {
          const pubkeyInfo = await nodeDepositContract.methods
            .pubkeyInfoOf(pubkeyAddress)
            .call()
            .catch((err: any) => {
              console.log({ err });
            });

          return pubkeyInfo;
        })();
      });

      const pubkeyInfos = await Promise.all(requests);
      // console.log({ pubkeyInfos });

      const beaconStatusResponse = await fetch(
        `/api/pubkeyStatus?id=${pubkeysOfNode.join(",")}`,
        {
          method: "GET",
        }
      );
      const beaconStatusResJson = await beaconStatusResponse.json();
      // console.log({ beaconStatusResJson });

      const nodePubkeyInfos: NodePubkeyInfo[] = pubkeyInfos.map(
        (item, index) => {
          const matchedBeaconData = beaconStatusResJson.data?.find(
            (item: any) => item.validator?.pubkey === pubkeysOfNode[index]
          );
          return {
            pubkeyAddress: pubkeysOfNode[index],
            beaconApiStatus:
              matchedBeaconData?.status?.toUpperCase() || undefined,
            ...item,
          };
        }
      );

      setNodePubkeyInfos(nodePubkeyInfos);
      setRefreshing(false);
      setRequestFirstTime(false);
    } catch (err: any) {
      setRefreshing(false);
      setRequestFirstTime(false);
      console.log({ err });
    }
  }, [nodeAddress, updateFlag]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  return {
    showLoading,
    showEmptyContent,
    totalCount,
    othersCount,
    pendingCount,
    activeCount,
    exitedCount,
    displayPubkeyInfos,
  };
};
