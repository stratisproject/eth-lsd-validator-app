import {
  getNodeDepositContract,
  getNodeDepositContractAbi,
} from "config/contract";
import { useCallback, useEffect, useState } from "react";
import { getEthWeb3 } from "utils/web3Utils";
import Web3 from "web3";

export function useSoloNodeDepositAmount() {
  const [soloNodeDepositAmount, setSoloNodeDepositAmount] = useState<string>();

  const updateData = useCallback(async () => {
    try {
      const web3 = getEthWeb3();
      const nodeDepositContract = new web3.eth.Contract(
        getNodeDepositContractAbi(),
        getNodeDepositContract(),
        {}
      );

      const soloNodeDepositAmount = await nodeDepositContract.methods
        .soloNodeDepositAmount()
        .call()
        .catch((err: any) => {
          console.log({ err });
        });
      console.log({ soloNodeDepositAmount });

      setSoloNodeDepositAmount(Web3.utils.fromWei(soloNodeDepositAmount));
    } catch (err: any) {
      console.log({ err });
    }
  }, []);

  useEffect(() => {
    updateData();
  }, [updateData]);

  return {
    soloNodeDepositAmount,
  };
}
