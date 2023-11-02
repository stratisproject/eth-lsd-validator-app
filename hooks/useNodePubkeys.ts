import {
  getNodeDepositContract,
  getNodeDepositContractAbi,
} from "config/contract";
import {
  ChainPubkeyStatus,
  DisplayPubkeyStatus,
  NodePubkeyInfo,
  PubkeyStatus,
} from "interfaces/common";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getBeaconStatusListOfDisplayPubkeyStatus,
  getBeaconStatusListOfPubkeyStatus,
} from "utils/commonUtils";
import { getEthWeb3 } from "utils/web3Utils";
import { useAppSlice } from "./selector";

export const useNodePubkeys = (
  nodeAddress: string | undefined,
  page: number,
  beaconStatusList?: (string | undefined)[]
) => {
  const { updateFlag } = useAppSlice();
  const [totalCount, setTotalCount] = useState<number>();
  const [unmatchedCount, setUnmatchedCount] = useState<number>();
  const [stakedCount, setStakedCount] = useState<number>();
  const [othersCount, setOthersCount] = useState<number>();

  const [pendingCount, setPendingCount] = useState<number>();
  const [activeCount, setActiveCount] = useState<number>();
  const [exitedCount, setExitedCount] = useState<number>();
  const [withdrawalCount, setWithdrawalCount] = useState<number>();

  const [nodePubkeyInfos, setNodePubkeyInfos] = useState<NodePubkeyInfo[]>([]);

  const [requestFirstTime, setRequestFirstTime] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const displayPubkeyInfos = useMemo(() => {
    return nodePubkeyInfos.filter((item) => {
      if (!beaconStatusList || beaconStatusList.length === 0) {
        return true;
      }

      return beaconStatusList.indexOf(item.beaconApiStatus) >= 0;
    });
  }, [beaconStatusList, nodePubkeyInfos]);

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

      let unmatchedCount = 0;
      let stakedCount = 0;
      let othersCount = 0;
      nodePubkeyInfos.forEach((item, index) => {
        // if (!item.beaconApiStatus) {
        //   if (item._status === ChainPubkeyStatus.UnMatch) {
        //     unmatchedCount++;
        //   } else if (item._status === ChainPubkeyStatus.Staked) {
        //     stakedCount++;
        //   } else {
        //     othersCount++;
        //   }
        // } else {
        if (
          getBeaconStatusListOfPubkeyStatus(PubkeyStatus.Unmatched).indexOf(
            item.beaconApiStatus
          ) >= 0
        ) {
          unmatchedCount++;
        } else if (
          getBeaconStatusListOfPubkeyStatus(PubkeyStatus.Staked).indexOf(
            item.beaconApiStatus
          ) >= 0
        ) {
          stakedCount++;
        } else {
          othersCount++;
        }
        // }
      });

      let pendingCount = 0;
      let activeCount = 0;
      let exitedCount = 0;
      let withdrawalCount = 0;
      nodePubkeyInfos.forEach((item, index) => {
        // if (!item.beaconApiStatus) {
        //   if (item._status === ChainPubkeyStatus.Staked) {
        //     pendingCount++;
        //   } else {
        //     activeCount++;
        //   }
        // } else {
        if (
          getBeaconStatusListOfDisplayPubkeyStatus(
            DisplayPubkeyStatus.Pending
          ).indexOf(item.beaconApiStatus) >= 0
        ) {
          pendingCount++;
        } else if (
          getBeaconStatusListOfDisplayPubkeyStatus(
            DisplayPubkeyStatus.Active
          ).indexOf(item.beaconApiStatus) >= 0
        ) {
          activeCount++;
        } else if (
          getBeaconStatusListOfDisplayPubkeyStatus(
            DisplayPubkeyStatus.Exited
          ).indexOf(item.beaconApiStatus) >= 0
        ) {
          exitedCount++;
        } else if (
          getBeaconStatusListOfDisplayPubkeyStatus(
            DisplayPubkeyStatus.Withdrawal
          ).indexOf(item.beaconApiStatus) >= 0
        ) {
          withdrawalCount++;
        }
        // }
      });

      setNodePubkeyInfos(nodePubkeyInfos);
      setUnmatchedCount(unmatchedCount);
      setStakedCount(stakedCount);
      setOthersCount(othersCount);
      setPendingCount(pendingCount);
      setActiveCount(activeCount);
      setExitedCount(exitedCount);
      setWithdrawalCount(withdrawalCount);
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
    pendingCount,
    activeCount,
    exitedCount,
    withdrawalCount,
  };
};
