import {
  getEthDepositContract,
  getNetworkWithdrawContract,
  getNetworkWithdrawContractAbi,
} from "config/contract";
import { useCallback, useEffect, useState } from "react";
import { getEthWeb3 } from "utils/web3Utils";
import Web3 from "web3";

export function useUnmatchedToken() {
  const [unmatchedEth, setUnmatchedEth] = useState<string>();

  const udpatePoolData = useCallback(async () => {
    try {
      const web3 = getEthWeb3();

      const networkWithdrawContract = new web3.eth.Contract(
        getNetworkWithdrawContractAbi(),
        getNetworkWithdrawContract(),
        {}
      );

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

      const unmatchedEth = Web3.utils.fromWei(
        Number(userDepositBalance) - Number(totalMissingAmountForWithdraw) + ""
      );

      setUnmatchedEth(unmatchedEth);
    } catch {}
  }, []);

  useEffect(() => {
    udpatePoolData();
  }, [udpatePoolData]);

  return {
    unmatchedEth,
  };
}
