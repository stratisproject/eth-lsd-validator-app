import {
  getEthDepositContract,
  getNetworkWithdrawContract,
  getMulticall3Contract,
} from "config/contract";
import {
  getNetworkWithdrawContractAbi,
  getMulticall3ContractAbi,
} from "config/contractAbi";
import { useCallback, useEffect, useState } from "react";
import { formatScientificNumber } from "utils/numberUtils";
import { getEthWeb3 } from "utils/web3Utils";
import Web3 from "web3";

export function useUnstakingPoolData() {
  const [poolEth, setPoolEth] = useState<string>();
  const [unstakeawableEth, setUnstakeawableEth] = useState<string>();
  const [ejectedValidators, setEjectedValidators] = useState<string>();
  const [waitingStakers, setWaitingStakers] = useState<string>();

  const udpatePoolData = useCallback(async () => {
    try {
      const multicall3ContractAddress = getMulticall3Contract()
      const multicall3ContractAbi = getMulticall3ContractAbi()
      const networkWithdrawContractAddress = getNetworkWithdrawContract()
      const networkBalanceContractAbi = getNetworkWithdrawContractAbi()

      const web3 = getEthWeb3();
      const multicall3Contract = new web3.eth.Contract(
        multicall3ContractAbi,
        multicall3ContractAddress,
      )

      const calls = [{
        target: getMulticall3Contract(),
        callData: web3.eth.abi.encodeFunctionCall(multicall3ContractAbi.find(({ name }) => name === 'getEthBalance')!, [getEthDepositContract()])
      }, {
        target: networkWithdrawContractAddress,
        callData: web3.eth.abi.encodeFunctionCall(networkBalanceContractAbi.find(({ name }) => name === 'totalMissingAmountForWithdraw')!, [])
      }, {
        target: networkWithdrawContractAddress,
        callData: web3.eth.abi.encodeFunctionCall(networkBalanceContractAbi.find(({ name }) => name === 'nextWithdrawIndex')!, [])
      }, {
        target: networkWithdrawContractAddress,
        callData: web3.eth.abi.encodeFunctionCall(networkBalanceContractAbi.find(({ name }) => name === 'maxClaimableWithdrawIndex')!, [])
      }]

      const {
        returnData: [
          userDepositBalanceResult,
          totalMissingAmountForWithdrawResult,
          nextWithdrawIndexResult,
          maxClaimableWithdrawIndexResult,
        ],
      } = await multicall3Contract.methods.aggregate(calls).call()
      const userDepositBalance: any = web3.eth.abi.decodeParameter('uint256', userDepositBalanceResult)
      const totalMissingAmountForWithdraw: any = web3.eth.abi.decodeParameter('uint256', totalMissingAmountForWithdrawResult)
      const nextWithdrawIndex: any = web3.eth.abi.decodeParameter('uint256', nextWithdrawIndexResult)
      const maxClaimableWithdrawIndex: any = web3.eth.abi.decodeParameter('uint256', maxClaimableWithdrawIndexResult)

      const poolEth = Web3.utils.fromWei(
        formatScientificNumber(
          Number(userDepositBalance) - Number(totalMissingAmountForWithdraw)
        ) + ""
      );
      setPoolEth(poolEth);

      setUnstakeawableEth("0");

      setWaitingStakers(
        Number(nextWithdrawIndex) - Number(maxClaimableWithdrawIndex) + ""
      );
    } catch (err: any) {
      console.log({ err });
    }
  }, []);

  useEffect(() => {
    udpatePoolData();
  }, [udpatePoolData]);

  return {
    poolEth,
    unstakeawableEth,
    waitingStakers,
    ejectedValidators,
  };
}
