import {
  getEthDepositContract,
  getLsdEthTokenContract,
  getNetworkWithdrawContract,
} from "config/contract";
import {
  getLsdEthTokenContractAbi,
  getNetworkWithdrawContractAbi,
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
      const web3 = getEthWeb3();

      const networkWithdrawContract = new web3.eth.Contract(
        getNetworkWithdrawContractAbi(),
        getNetworkWithdrawContract(),
        {}
      );

      const lsdTokenContract = new web3.eth.Contract(
        getLsdEthTokenContractAbi(),
        getLsdEthTokenContract(),
        {}
      );

      const lsdTotalSupply = await lsdTokenContract.methods
        .totalSupply()
        .call()
        .catch((err: any) => {
          console.log({ err });
        });

      const lsdRate = await lsdTokenContract.methods
        .getRate()
        .call()
        .catch((err: any) => {
          console.log({ err });
        });

      const userDepositBalance = await web3.eth.getBalance(
        getEthDepositContract()
      );

      const totalMissingAmountForWithdraw =
        await networkWithdrawContract.methods
          .totalMissingAmountForWithdraw()
          .call()
          .catch((err: any) => {
            console.log({ err });
          });

      const poolEth = Web3.utils.fromWei(
        formatScientificNumber(
          Number(userDepositBalance) - Number(totalMissingAmountForWithdraw)
        ) + ""
      );
      setPoolEth(poolEth);

      setUnstakeawableEth("0");

      const nextWithdrawIndex = await networkWithdrawContract.methods
        .nextWithdrawIndex()
        .call()
        .catch((err: any) => {
          console.log({ err });
        });

      const maxClaimableWithdrawIndex = await networkWithdrawContract.methods
        .maxClaimableWithdrawIndex()
        .call()
        .catch((err: any) => {
          console.log({ err });
        });

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
