import {
  getNetworkWithdrawContract,
  getNetworkWithdrawContractAbi,
  getNodeDepositContract,
  getNodeDepositContractAbi,
} from "config/contract";
import { useCallback, useEffect, useState } from "react";
import { getEthWeb3 } from "utils/web3Utils";
import { useWalletAccount } from "./useWalletAccount";
import Web3 from "web3";
import { IpfsRewardItem } from "interfaces/common";
import { useAppSlice } from "./selector";

interface RewardJsonResponse {
  Epoch: number;
  List: IpfsRewardItem[];
}

export function useMyData() {
  const { updateFlag } = useAppSlice();
  const { metaMaskAccount } = useWalletAccount();

  const [selfDepositedToken, setSelfDepositedToken] = useState<string>();
  const [totalManagedToken, setTotalManagedToken] = useState<string>();
  const [myRewardTokenAmount, setMyRewardTokenAmount] = useState<string>();
  const [ipfsMyRewardInfo, setIpfsMyRewardInfo] = useState<IpfsRewardItem>();
  const [availableExitDeposit, setAvailableExitDeposit] = useState<string>();
  const [pubkeysOfNode, setPubkeysOfNode] = useState<string[]>([]);
  const [myShareAmount, setMyShareAmount] = useState<string>();
  const [mySharePercentage, setMySharePercentage] = useState<string>();

  const updateData = useCallback(async () => {
    if (!metaMaskAccount) {
      return;
    }

    const userAddress = metaMaskAccount;
    // const userAddress = "0xD3FaA2F7B452Ade554786d94b57eb9CC62139b09";

    try {
      const web3 = getEthWeb3();
      const networkWithdrawContract = new web3.eth.Contract(
        getNetworkWithdrawContractAbi(),
        getNetworkWithdrawContract(),
        {
          from: userAddress,
        }
      );

      const nodeRewardsFileCid = await networkWithdrawContract.methods
        .nodeRewardsFileCid()
        .call()
        .catch((err: any) => {
          console.log({ err });
        });
      const latestMerkleRootEpoch = await networkWithdrawContract.methods
        .latestMerkleRootEpoch()
        .call()
        .catch((err: any) => {
          console.log({ err });
        });
      const totalClaimedRewardOfNode = await networkWithdrawContract.methods
        .totalClaimedRewardOfNode(userAddress)
        .call()
        .catch((err: any) => {
          console.log({ err });
        });
      const totalClaimedDepositOfNode = await networkWithdrawContract.methods
        .totalClaimedDepositOfNode(userAddress)
        .call()
        .catch((err: any) => {
          console.log({ err });
        });

      // console.log({ nodeRewardsFileCid });
      // console.log({ latestMerkleRootEpoch });
      // console.log({ totalClaimedRewardOfNode });
      // console.log({ totalClaimedDepositOfNode });

      const response = await fetch(
        `https://${nodeRewardsFileCid}.ipfs.dweb.link/nodeRewards-${latestMerkleRootEpoch}.json`,
        {
          method: "GET",
          headers: {},
        }
      );
      const resJson: RewardJsonResponse = await response.json();
      // console.log({ resJson });

      const myRewardInfo = resJson.List?.find(
        (item) => item.address === userAddress
      );
      setIpfsMyRewardInfo(myRewardInfo);

      const myTotalRewardAmount = myRewardInfo?.totalRewardAmount || "0";

      const availableExitDeposit = !myRewardInfo
        ? "0"
        : Math.max(
            0,
            Number(myRewardInfo?.totalExitDepositAmount) -
              Number(totalClaimedDepositOfNode)
          ) + "";

      setAvailableExitDeposit(Web3.utils.fromWei(availableExitDeposit));

      const nodeDepositContract = new web3.eth.Contract(
        getNodeDepositContractAbi(),
        getNodeDepositContract(),
        {
          from: userAddress,
        }
      );
      // const soloNodeDepositAmount = await nodeDepositContract.methods
      //   .soloNodeDepositAmount()
      //   .call()
      //   .catch((err: any) => {
      //     console.log({ err });
      //   });
      const pubkeysOfNode = await nodeDepositContract.methods
        .getPubkeysOfNode(userAddress)
        .call()
        .catch((err: any) => {
          console.log({ err });
        });
      setPubkeysOfNode(pubkeysOfNode);

      // console.log({ pubkeysOfNode });
      // console.log({ soloNodeDepositAmount });

      const totalManagedEth = pubkeysOfNode.length * 32;
      const myRewardEth = Web3.utils.fromWei(
        Number(myTotalRewardAmount) - Number(totalClaimedRewardOfNode) + ""
      );

      // console.log({ totalManagedEth });
      // console.log({ myRewardEth });

      setSelfDepositedToken("0");
      setTotalManagedToken(totalManagedEth + "");
      setMyRewardTokenAmount(myRewardEth);
    } catch (err: any) {
      console.log({ err });
    }
  }, [metaMaskAccount]);

  useEffect(() => {
    updateData();
  }, [updateData, updateFlag]);

  const updateNodeData = useCallback(async () => {
    if (!ipfsMyRewardInfo) {
      return;
    }
    const requests = pubkeysOfNode.map((pubkeyAddress) => {
      return (async () => {
        const web3 = getEthWeb3();
        const nodeDepositContract = new web3.eth.Contract(
          getNodeDepositContractAbi(),
          getNodeDepositContract(),
          {}
        );

        const pubkeyInfo = await nodeDepositContract.methods
          .pubkeyInfoOf(pubkeyAddress)
          .call()
          .catch((err: any) => {
            console.log({ err });
          });

        return pubkeyInfo;
      })();
    });

    const pubekyInfos = await Promise.all(requests);
    let myShareAmount = 0;
    pubekyInfos.forEach((pubkeyInfo) => {
      myShareAmount += Number(pubkeyInfo._nodeDepositAmount);
    });

    myShareAmount = Math.max(
      0,
      myShareAmount - ipfsMyRewardInfo?.totalExitDepositAmount
    );

    setMyShareAmount(Web3.utils.fromWei(myShareAmount + ""));
    setMySharePercentage(
      Number(Web3.utils.fromWei(myShareAmount + "")) /
        Number(totalManagedToken) +
        ""
    );
  }, [pubkeysOfNode, ipfsMyRewardInfo, totalManagedToken]);

  useEffect(() => {
    updateNodeData();
  }, [updateNodeData, updateFlag]);

  return {
    selfDepositedToken,
    totalManagedToken,
    myRewardTokenAmount,
    ipfsMyRewardInfo,
    availableExitDeposit,
    myShareAmount,
    mySharePercentage,
  };
}
