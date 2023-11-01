import { useCallback, useEffect, useMemo, useState } from "react";
import { useWalletAccount } from "./useWalletAccount";
import { getEthWeb3 } from "utils/web3Utils";
import {
  getNodeDepositContract,
  getNodeDepositContractAbi,
} from "config/contract";
import { NodePubkeyInfo, PubkeyStatus } from "interfaces/common";
import { useAppSlice } from "./selector";

export const useNodePubkeys = (
  nodeAddress: string | undefined,
  page: number,
  statusList?: PubkeyStatus[]
) => {
  const { updateFlag } = useAppSlice();
  const [totalCount, setTotalCount] = useState<number>();
  const [unmatchedCount, setUnmatchedCount] = useState<number>();
  const [stakedCount, setStakedCount] = useState<number>();
  const [othersCount, setOthersCount] = useState<number>();

  const [nodePubkeyInfos, setNodePubkeyInfos] = useState<NodePubkeyInfo[]>([]);

  const [requestFirstTime, setRequestFirstTime] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const displayPubkeyInfos = useMemo(() => {
    return nodePubkeyInfos.filter((item) => {
      if (!statusList || statusList.length === 0) {
        return true;
      }

      let hasMatch = false;
      statusList.forEach((status) => {
        if (status === PubkeyStatus.Others) {
          if (
            item._status !== PubkeyStatus.Unmatched &&
            item._status !== PubkeyStatus.Staked
          ) {
            hasMatch = true;
          }
        } else {
          if (item._status === status) {
            hasMatch = true;
          }
        }
      });

      return hasMatch;
    });
  }, [statusList, nodePubkeyInfos]);

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

      let unmatchedCount = 0;
      let stakedCount = 0;
      let othersCount = 0;

      pubkeyInfos.forEach((item, index) => {
        if (item._status === PubkeyStatus.Unmatched) {
          unmatchedCount++;
        } else if (item._status === PubkeyStatus.Staked) {
          stakedCount++;
        } else {
          othersCount++;
        }
      });

      const nodePubkeyInfo: NodePubkeyInfo[] = pubkeyInfos.map(
        (item, index) => {
          return {
            pubkeyAddress: pubkeysOfNode[index],
            ...item,
          };
        }
      );

      setNodePubkeyInfos(nodePubkeyInfo);
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
