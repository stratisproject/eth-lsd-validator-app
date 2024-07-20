import {
  ChainPubkeyStatus,
  NodePubkeyInfo,
  PubkeyStatus,
} from "interfaces/common";
import { useEffect, useMemo, useState } from "react";
import { getPubkeyDisplayStatus } from "utils/commonUtils";
import { useAppSlice } from "./selector";
import { useUnmatchedToken } from "./useUnmatchedToken";
import { useUserPubkeys } from "./useUserPubkeys";

export const usePubkeysHome = (
  nodeAddress: string | undefined,
  page: number,
  selectedPubkeyStatus?: PubkeyStatus
) => {
  const { updateFlag } = useAppSlice();
  const [totalCount, setTotalCount] = useState<number>();
  const [unmatchedCount, setUnmatchedCount] = useState<number>();
  const [stakedCount, setStakedCount] = useState<number>();
  const [othersCount, setOthersCount] = useState<number>();

  const { nodePubkeys } = useUserPubkeys();

  const [displayPubkeyInfos, setDisplayPubkeyInfos] = useState<
    NodePubkeyInfo[]
  >([]);

  const [requestFirstTime, setRequestFirstTime] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { unmatchedEth } = useUnmatchedToken();

  useEffect(() => {
    if (!nodePubkeys) {
      return;
    }

    let remainingTokenAmount =
      !unmatchedEth || isNaN(Number(unmatchedEth)) ? 0 : Number(unmatchedEth);

    let unmatchedCount = 0;
    let stakedCount = 0;
    let othersCount = 0;

    const resList: NodePubkeyInfo[] = [];

    nodePubkeys.forEach((item) => {
      const displayStatus = getPubkeyDisplayStatus(item, remainingTokenAmount);
      let canStake = false;
      if (
        item._status === ChainPubkeyStatus.Match &&
        remainingTokenAmount >= 31
      ) {
        remainingTokenAmount -= 31;
        canStake = true;
      }

      const isUnmatch = displayStatus === "Unmatched";
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
  }, [nodePubkeys, selectedPubkeyStatus, unmatchedEth]);

  const showLoading = useMemo(() => {
    return nodePubkeys === undefined;
  }, [nodePubkeys]);

  const showEmptyContent = useMemo(() => {
    return displayPubkeyInfos.length === 0 && !showLoading;
  }, [showLoading, displayPubkeyInfos]);

  // const updateData = useCallback(async () => {
  //   if (!nodeAddress) {
  //     setTotalCount(undefined);
  //     setUnmatchedCount(undefined);
  //     setStakedCount(undefined);
  //     setOthersCount(undefined);
  //     return;
  //   }

  //   try {
  //     setRefreshing(true);
  //     const web3 = getEthWeb3();

  //     const nodeDepositContract = new web3.eth.Contract(
  //       getNodeDepositContractAbi(),
  //       getNodeDepositContract(),
  //       {
  //         from: nodeAddress,
  //       }
  //     );

  //     const pubkeysOfNode = await nodeDepositContract.methods
  //       .getPubkeysOfNode(nodeAddress)
  //       .call()
  //       .catch((err: any) => {
  //         console.log({ err });
  //       });

  //     setTotalCount(pubkeysOfNode.length);

  //     const requests = pubkeysOfNode?.map((pubkeyAddress: string) => {
  //       return (async () => {
  //         const pubkeyInfo = await nodeDepositContract.methods
  //           .pubkeyInfoOf(pubkeyAddress)
  //           .call()
  //           .catch((err: any) => {
  //             console.log({ err });
  //           });

  //         return pubkeyInfo;
  //       })();
  //     });

  //     const pubkeyInfos = await Promise.all(requests);

  //     const beaconStatusResponse = await fetch(
  //       `/api/pubkeyStatus?id=${pubkeysOfNode.join(",")}`,
  //       {
  //         method: "GET",
  //       }
  //     );
  //     const beaconStatusResJson = await beaconStatusResponse.json();

  //     const nodePubkeyInfos: NodePubkeyInfo[] = pubkeyInfos.map(
  //       (item, index) => {
  //         const matchedBeaconData = beaconStatusResJson.data?.find(
  //           (item: any) => item.validator?.pubkey === pubkeysOfNode[index]
  //         );
  //         return {
  //           pubkeyAddress: pubkeysOfNode[index],
  //           beaconApiStatus:
  //             matchedBeaconData?.status?.toUpperCase() || undefined,
  //           ...item,
  //         };
  //       }
  //     );

  //     setUnmatchedCount(unmatchedCount);
  //     setStakedCount(stakedCount);
  //     setOthersCount(othersCount);
  //     setRefreshing(false);
  //     setRequestFirstTime(false);
  //   } catch (err: any) {
  //     setRefreshing(false);
  //     setRequestFirstTime(false);
  //     console.log({ err });
  //   }
  // }, [nodeAddress, updateFlag]);

  // useEffect(() => {
  //   updateData();
  // }, [updateData]);

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
