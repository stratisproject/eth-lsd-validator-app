import {
  getNodeDepositContract,
  getNodeDepositContractAbi,
} from "config/contract";
import {
  ChainPubkeyStatus,
  NodePubkeyInfo,
  PubkeyStatus,
} from "interfaces/common";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getEthWeb3 } from "utils/web3Utils";
import { useAppSlice } from "./selector";
import { useUnmatchedToken } from "./useUnmatchedToken";
import { getPubkeyDisplayStatus } from "utils/commonUtils";

export const useNodePubkeysHome = (
  nodeAddress: string | undefined,
  page: number,
  selectedPubkeyStatus?: PubkeyStatus
) => {
  const { updateFlag } = useAppSlice();
  const [totalCount, setTotalCount] = useState<number>();
  const [unmatchedCount, setUnmatchedCount] = useState<number>();
  const [stakedCount, setStakedCount] = useState<number>();
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

    let unmatchedCount = 0;
    let stakedCount = 0;
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

      const isUnmatch = item.displayStatus === "Unmatched";
      const isStaked =
        item._status === ChainPubkeyStatus.Staked &&
        item.beaconApiStatus !== "EXITED_UNSLASHED" &&
        item.beaconApiStatus !== "EXITED_SLASHED" &&
        item.beaconApiStatus !== "WITHDRAWAL_POSSIBLE" &&
        item.beaconApiStatus !== "WITHDRAWAL_DONE" &&
        item.beaconApiStatus !== "EXITED" &&
        item.beaconApiStatus !== "WITHDRAWAL";

      if (isUnmatch) {
        unmatchedCount++;
      } else if (isStaked) {
        stakedCount++;
      } else {
        othersCount++;
      }

      const newItem = { ...item, displayStatus, canStake };

      if (isUnmatch && selectedPubkeyStatus === PubkeyStatus.Unmatched) {
        resList.push(newItem);
      } else if (isStaked && selectedPubkeyStatus === PubkeyStatus.Staked) {
        resList.push(newItem);
      } else if (
        !isUnmatch &&
        !isStaked &&
        selectedPubkeyStatus === PubkeyStatus.Others
      ) {
        resList.push(newItem);
      } else if (!selectedPubkeyStatus) {
        resList.push(newItem);
      }
    });

    setDisplayPubkeyInfos(resList);
    setUnmatchedCount(unmatchedCount);
    setStakedCount(stakedCount);
    setOthersCount(othersCount);
  }, [nodePubkeyInfos, selectedPubkeyStatus, unmatchedEth]);

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
      setUnmatchedCount(undefined);
      setStakedCount(undefined);
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

      // console.log({ pubkeysOfNode });
      setTotalCount(pubkeysOfNode.length);

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
      console.log({ beaconStatusResJson });

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
      setUnmatchedCount(unmatchedCount);
      setStakedCount(stakedCount);
      setOthersCount(othersCount);
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
    displayPubkeyInfos,
    totalCount,
    unmatchedCount,
    stakedCount,
    othersCount,
  };
};
