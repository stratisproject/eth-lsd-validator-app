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

interface RewardJsonResponse {
  Epoch: number;
  List: IpfsRewardItem[];
}

export function useMyData() {
  const { metaMaskAccount } = useWalletAccount();

  const [selfDepositedToken, setSelfDepositedToken] = useState<string>();
  const [totalManagedToken, setTotalManagedToken] = useState<string>();
  const [myRewardTokenAmount, setMyRewardTokenAmount] = useState<string>();
  const [ipfsMyRewardInfo, setIpfsMyRewardInfo] = useState<IpfsRewardItem>();
  const [availableExitDeposit, setAvailableExitDeposit] = useState<string>();

  const updateData = useCallback(async () => {
    if (!metaMaskAccount) {
      return;
    }

    try {
      const web3 = getEthWeb3();
      const networkWithdrawContract = new web3.eth.Contract(
        getNetworkWithdrawContractAbi(),
        getNetworkWithdrawContract(),
        {
          from: metaMaskAccount,
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
        .totalClaimedRewardOfNode(metaMaskAccount)
        .call()
        .catch((err: any) => {
          console.log({ err });
        });
      const totalClaimedDepositOfNode = await networkWithdrawContract.methods
        .totalClaimedDepositOfNode(metaMaskAccount)
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
        (item) => item.address === metaMaskAccount
      );
      setIpfsMyRewardInfo(myRewardInfo);

      const myTotalRewardAmount = myRewardInfo?.totalRewardAmount || "0";

      const availableExitDeposit =
        Math.max(
          0,
          Number(myTotalRewardAmount) - Number(totalClaimedDepositOfNode)
        ) + "";
      setAvailableExitDeposit(Web3.utils.fromWei(availableExitDeposit));

      const nodeDepositContract = new web3.eth.Contract(
        getNodeDepositContractAbi(),
        getNodeDepositContract(),
        {
          from: metaMaskAccount,
        }
      );

      // const soloNodeDepositAmount = await nodeDepositContract.methods
      //   .soloNodeDepositAmount()
      //   .call()
      //   .catch((err: any) => {
      //     console.log({ err });
      //   });
      const pubkeysOfNode = await nodeDepositContract.methods
        .getPubkeysOfNode(metaMaskAccount)
        .call()
        .catch((err: any) => {
          console.log({ err });
        });

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
  }, [updateData]);

  return {
    selfDepositedToken,
    totalManagedToken,
    myRewardTokenAmount,
    ipfsMyRewardInfo,
    availableExitDeposit,
  };
}
