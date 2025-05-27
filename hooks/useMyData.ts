import {
  getLsdEthTokenContract,
  getMulticall3Contract,
  getNetworkWithdrawContract,
  getNodeDepositContract,
} from "config/contract";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getEthWeb3 } from "utils/web3Utils";
import { useWalletAccount } from "./useWalletAccount";
import Web3 from "web3";
import {
  ChainPubkeyStatus,
  IpfsRewardItem,
} from "interfaces/common";
import { useAppSlice } from "./selector";
import {
  getMulticall3ContractAbi,
  getNetworkWithdrawContractAbi,
  getNodeDepositContractAbi,
} from "config/contractAbi";
import { useUserPubkeys } from "./useUserPubkeys";
import { getEthereumChainId, getValidatorTotalDepositAmount } from "config/env";
import { formatScientificNumber, removeDecimals } from "utils/numberUtils";
import { isPubkeyStillValid } from "utils/commonUtils";
import JsonBigint from 'json-bigint'

export function useMyData() {
  const { updateFlag } = useAppSlice();
  const { metaMaskAccount } = useWalletAccount();

  const networkWithdrawContractAddress = getNetworkWithdrawContract()
  const networkWithdrawContractAbi = getNetworkWithdrawContractAbi()
  const nodeDepositContractAddress = getNodeDepositContract()
  const nodeDepositContractAbi = getNodeDepositContractAbi()

  const [selfDepositedToken, setSelfDepositedToken] = useState<string>();
  const [myRewardTokenAmount, setMyRewardTokenAmount] = useState<string>();
  const [ipfsMyRewardInfo, setIpfsMyRewardInfo] = useState<IpfsRewardItem>();
  const [availableExitDeposit, setAvailableExitDeposit] = useState<string>();
  const [myShareAmount, setMyShareAmount] = useState<string>();
  const [mySharePercentage, setMySharePercentage] = useState<string>();

  const { nodePubkeys } = useUserPubkeys();

  const totalManagedToken = useMemo(() => {
    if (!nodePubkeys) {
      return undefined;
    }

    let totalManagedToken = 0;
    nodePubkeys.forEach((item) => {
      if (
        item._status === ChainPubkeyStatus.Staked &&
        isPubkeyStillValid(item.beaconApiStatus)
      ) {
        totalManagedToken += getValidatorTotalDepositAmount();
      }
    });

    return totalManagedToken + "";
  }, [nodePubkeys]);

  const updateData = useCallback(async () => {
    if (!metaMaskAccount) {
      setSelfDepositedToken("--");
      setMyRewardTokenAmount("--");
      return;
    }

    try {
      const web3 = getEthWeb3();
      const multicall3Contract = new web3.eth.Contract(
        getMulticall3ContractAbi(),
        getMulticall3Contract(),
      )

      const calls = [{
        target: networkWithdrawContractAddress,
        callData: web3.eth.abi.encodeFunctionCall(networkWithdrawContractAbi.find(({ name }) => name === 'nodeRewardsFileCid')!, [])
      }, {
        target: networkWithdrawContractAddress,
        callData: web3.eth.abi.encodeFunctionCall(networkWithdrawContractAbi.find(({ name }) => name === 'latestMerkleRootEpoch')!, [])
      }, {
        target: networkWithdrawContractAddress,
        callData: web3.eth.abi.encodeFunctionCall(networkWithdrawContractAbi.find(({ name }) => name === 'totalClaimedRewardOfNode')!, [metaMaskAccount])
      }, {
        target: networkWithdrawContractAddress,
        callData: web3.eth.abi.encodeFunctionCall(networkWithdrawContractAbi.find(({ name }) => name === 'totalClaimedDepositOfNode')!, [metaMaskAccount])
      }]

      const {
        returnData: [
          nodeRewardsFileCidResult,
          latestMerkleRootEpochResult,
          totalClaimedRewardOfNodeResult,
          totalClaimedDepositOfNodeResult,
        ],
      } = await multicall3Contract.methods.aggregate(calls).call()
      const nodeRewardsFileCid = web3.eth.abi.decodeParameter('string', nodeRewardsFileCidResult)
      const latestMerkleRootEpoch = web3.eth.abi.decodeParameter('uint256', latestMerkleRootEpochResult)
      const totalClaimedRewardOfNode = web3.eth.abi.decodeParameter('uint256', totalClaimedRewardOfNodeResult)
      const totalClaimedDepositOfNode = web3.eth.abi.decodeParameter('uint256', totalClaimedDepositOfNodeResult)

      let resTextJson = {
        List: [],
      }

      if (nodeRewardsFileCid) {
        const response = await fetch(
          `https://ipfs.stratisplatform.com/ipfs/${nodeRewardsFileCid}/${getLsdEthTokenContract().toLowerCase()}-rewards-${getEthereumChainId()}-${latestMerkleRootEpoch}.json`,
          {
            method: "GET",
            headers: {},
          }
        );
        const resText = await response.text();
        resTextJson = JsonBigint.parse(resText);
      }

      const list: IpfsRewardItem[] = resTextJson.List?.map((item: any) => {
        return {
          ...item,
          totalRewardAmount: removeDecimals(item.totalRewardAmount.toFixed()),
          totalDepositAmount: removeDecimals(item.totalDepositAmount.toFixed()),
          totalExitDepositAmount: removeDecimals(
            item.totalExitDepositAmount.toFixed()
          ),
        };
      });

      const myRewardInfo = list?.find((item) => item.address === metaMaskAccount);
      setIpfsMyRewardInfo(myRewardInfo);

      const myTotalRewardAmount = myRewardInfo?.totalRewardAmount || "0";

      const availableExitDeposit = !myRewardInfo
        ? 0
        : Math.max(
            0,
            Number(myRewardInfo?.totalExitDepositAmount) -
              Number(totalClaimedDepositOfNode)
          );

      setAvailableExitDeposit(
        Web3.utils.fromWei(formatScientificNumber(availableExitDeposit))
      );

      const myRewardEth = Web3.utils.fromWei(
        formatScientificNumber(
          Number(myTotalRewardAmount) - Number(totalClaimedRewardOfNode)
        ) + ""
      );

      setMyRewardTokenAmount(myRewardEth);
    } catch (err: any) {
      console.log({ err });
    }
  }, [
    metaMaskAccount,
    nodeDepositContractAddress,
    nodeDepositContractAbi,
    networkWithdrawContractAddress,
    networkWithdrawContractAbi,
  ]);

  useEffect(() => {
    updateData();
  }, [updateData, updateFlag]);

  const updateNodeData = useCallback(async () => {
    try {
      if (!metaMaskAccount) {
        return;
      }

      let myShareAmount = 0;
      let selfDepositAmount = 0;

      let totalNodeDepositAmount = 0;

      nodePubkeys?.forEach((pubkeyInfo, index) => {
        if (isPubkeyStillValid(pubkeyInfo.beaconApiStatus)) {
          totalNodeDepositAmount += Number(pubkeyInfo._nodeDepositAmount);
          myShareAmount += Number(pubkeyInfo._nodeDepositAmount);
        }
      });

      myShareAmount = Math.max(
        0,
        myShareAmount -
          (ipfsMyRewardInfo ? ipfsMyRewardInfo?.totalExitDepositAmount : 0)
      );

      selfDepositAmount = Math.max(0, totalNodeDepositAmount);
      setMyShareAmount(
        Web3.utils.fromWei(formatScientificNumber(myShareAmount))
      );

      setMySharePercentage(
        Number(Web3.utils.fromWei(formatScientificNumber(myShareAmount))) /
          Number(totalManagedToken) +
          ""
      );

      setSelfDepositedToken(
        Web3.utils.fromWei(formatScientificNumber(selfDepositAmount) + "")
      );
    } catch (err: any) {
      console.log({ err });
    }
  }, [
    metaMaskAccount,
    JSON.stringify(nodePubkeys),
    JSON.stringify(ipfsMyRewardInfo),
    totalManagedToken,
  ]);

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
