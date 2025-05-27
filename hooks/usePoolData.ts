import {
  getEthDepositContract,
  getLsdEthTokenContract,
  getNetworkWithdrawContract,
  getMulticall3Contract,
} from "config/contract";
import {
  getLsdEthTokenContractAbi,
  getNetworkWithdrawContractAbi,
  getMulticall3ContractAbi,
} from "config/contractAbi";
import { IpfsRewardItem } from "interfaces/common";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getEthWeb3 } from "utils/web3Utils";
import Web3 from "web3";
import { useAppSlice } from "./selector";
import { usePoolPubkeyData } from "./usePoolPubkeyData";
import { usePrice } from "./usePrice";
import { getEthereumChainId, getValidatorTotalDepositAmount } from "config/env";
import { formatScientificNumber, removeDecimals } from "utils/numberUtils";
import JsonBigint from 'json-bigint'

export function usePoolData() {
  const { updateFlag } = useAppSlice();
  const [depositedEth, setDepositedEth] = useState<string>();
  const [depositedEthValue, setDepositedEthValue] = useState<string>();
  const [mintedLsdToken, setMintedLsdToken] = useState<string>();
  const [allEth, setAllEth] = useState<string>();
  const [allEthValue, setAllEthValue] = useState<string>();
  const [poolEth, setPoolEth] = useState<string>();
  const [poolEthValue, setPoolEthValue] = useState<string>();
  const [unmatchedEth, setUnmatchedEth] = useState<string>();
  const [stakeApr, setStakeApr] = useState<string>();
  const [validatorApr, setValidatorApr] = useState<string>();

  const [lsdTotalSupply, setLsdTotalSupply] = useState<string>();
  const [lsdRate, setLsdRate] = useState<string>();

  const { tokenPrice } = usePrice();

  const { matchedValidators } = usePoolPubkeyData();

  const stakedToken = useMemo(() => {
    if (!matchedValidators) {
      return undefined;
    }
    return Number(matchedValidators) * getValidatorTotalDepositAmount() + "";
  }, [matchedValidators]);

  const mintedLsdTokenValue = useMemo(() => {
    if (
      !tokenPrice ||
      isNaN(Number(tokenPrice)) ||
      !lsdTotalSupply ||
      isNaN(Number(lsdTotalSupply)) ||
      !lsdRate ||
      isNaN(Number(lsdRate))
    ) {
      return undefined;
    }
    return Number(lsdTotalSupply) * Number(lsdRate) * Number(tokenPrice);
  }, [lsdTotalSupply, lsdRate, tokenPrice]);

  const stakedTokenValue = useMemo(() => {
    if (
      !tokenPrice ||
      isNaN(Number(tokenPrice)) ||
      !stakedToken ||
      isNaN(Number(stakedToken))
    ) {
      return undefined;
    }
    return Number(stakedToken) * Number(tokenPrice);
  }, [stakedToken, tokenPrice]);

  const updatePoolData = useCallback(async () => {
    try {
      const web3 = getEthWeb3();

      const userDepositBalance = await web3.eth.getBalance(
        getEthDepositContract()
      );

      const unmatchedEth = Web3.utils.fromWei(userDepositBalance);
      setUnmatchedEth(unmatchedEth);
    } catch {}
  }, [updateFlag]);

  useEffect(() => {
    updatePoolData();
  }, [updatePoolData]);

  const updatePoolTokenData = useCallback(async () => {
    try {
      const web3 = getEthWeb3();
      const multicall3Contract = new web3.eth.Contract(
        getMulticall3ContractAbi(),
        getMulticall3Contract(),
      )

      const lsdTokenContractAddress = getLsdEthTokenContract()
      const lsdTokenContractAbi = getLsdEthTokenContractAbi()
      const networkWithdrawContractAddress = getNetworkWithdrawContract()
      const networkWithdrawContractAbi = getNetworkWithdrawContractAbi()

      let calls = [{
        target: lsdTokenContractAddress,
        callData: web3.eth.abi.encodeFunctionCall(lsdTokenContractAbi.find(({ name }) => name === 'totalSupply')!, [])
      }, {
        target: lsdTokenContractAddress,
        callData: web3.eth.abi.encodeFunctionCall(lsdTokenContractAbi.find(({ name }) => name === 'getRate')!, [])
      }, {
        target: networkWithdrawContractAddress,
        callData: web3.eth.abi.encodeFunctionCall(networkWithdrawContractAbi.find(({ name }) => name === 'nodeRewardsFileCid')!, [])
      }, {
        target: networkWithdrawContractAddress,
        callData: web3.eth.abi.encodeFunctionCall(networkWithdrawContractAbi.find(({ name }) => name === 'latestMerkleRootEpoch')!, [])
      }]

      const {
        returnData: [
          lsdTotalSupplyResult,
          lsdRateResult,
          nodeRewardsFileCidResult,
          latestMerkleRootEpochResult,
        ],
      } = await multicall3Contract.methods.aggregate(calls).call()
      const lsdTotalSupply: any = web3.eth.abi.decodeParameter('uint256', lsdTotalSupplyResult)
      const lsdRate: any = web3.eth.abi.decodeParameter('uint256', lsdRateResult)
      const nodeRewardsFileCid = web3.eth.abi.decodeParameter('string', nodeRewardsFileCidResult)
      const latestMerkleRootEpoch = web3.eth.abi.decodeParameter('uint256', latestMerkleRootEpochResult)

      setLsdTotalSupply(Web3.utils.fromWei(lsdTotalSupply));
      setLsdRate(Web3.utils.fromWei(lsdRate));
      setMintedLsdToken(Web3.utils.fromWei(lsdTotalSupply));

      let poolEth = Number(lsdTotalSupply) * Number(Web3.utils.fromWei(lsdRate));

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
        };
      });

      const totalClaimedRewardOfNodeInf = networkWithdrawContractAbi.find(({ name }) => name === 'totalClaimedRewardOfNode')!
      const totalClaimedDepositOfNodeInf = networkWithdrawContractAbi.find(({ name }) => name === 'totalClaimedDepositOfNode')!

      calls = list?.map((data) => ([{
        target: networkWithdrawContractAddress,
        callData: web3.eth.abi.encodeFunctionCall(totalClaimedRewardOfNodeInf, [data.address])
      }, {
        target: networkWithdrawContractAddress,
        callData: web3.eth.abi.encodeFunctionCall(totalClaimedDepositOfNodeInf, [data.address])
      }])).flat()

      const multicallResult = await multicall3Contract.methods.aggregate(calls).call()
      list?.forEach((data, idx) => {
        if (data.totalRewardAmount) {
          poolEth = poolEth + Number(data.totalRewardAmount);
        }
        if (data.totalDepositAmount) {
          poolEth = poolEth + Number(data.totalDepositAmount);
        }

        const [totalClaimedRewardOfNodeResult, totalClaimedDepositOfNodeResult] = multicallResult.returnData.slice(idx, idx+2)
        const totalClaimedRewardOfNode = web3.eth.abi.decodeParameter('uint256', totalClaimedRewardOfNodeResult)
        const totalClaimedDepositOfNode = web3.eth.abi.decodeParameter('uint256', totalClaimedDepositOfNodeResult)

        if (totalClaimedRewardOfNode) {
          poolEth = poolEth - Number(totalClaimedRewardOfNode);
        }
        if (totalClaimedDepositOfNode) {
          poolEth = poolEth - Number(totalClaimedDepositOfNode);
        }
      })

      // console.log({ poolEth });

      setPoolEth(Web3.utils.fromWei(formatScientificNumber(poolEth) + ""));
    } catch {
      setPoolEth("--");
    }
  }, [updateFlag]);

  useEffect(() => {
    updatePoolTokenData();
  }, [updatePoolTokenData]);

  return {
    depositedEth,
    depositedEthValue,
    mintedLsdToken,
    mintedLsdTokenValue,
    stakedToken,
    stakedTokenValue,
    allEth,
    allEthValue,
    poolEth,
    poolEthValue,
    unmatchedEth,
    stakeApr,
    validatorApr,
    matchedValidators,
  };
}
