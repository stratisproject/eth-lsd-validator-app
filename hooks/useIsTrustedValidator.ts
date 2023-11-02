import {
  getNodeDepositContract,
  getNodeDepositContractAbi,
} from "config/contract";
import { useCallback, useEffect, useState } from "react";
import { createWeb3 } from "utils/web3Utils";
import { useWalletAccount } from "./useWalletAccount";
import { ValidatorNodeType } from "interfaces/common";

export function useIsTrustedValidator() {
  const { metaMaskAccount } = useWalletAccount();
  const [isTrust, setIsTrust] = useState(false);

  const updateStatus = useCallback(async () => {
    if (!metaMaskAccount) {
      setIsTrust(false);
      return;
    }
    try {
      const web3 = createWeb3();
      let nodeDepositContract = new web3.eth.Contract(
        getNodeDepositContractAbi(),
        getNodeDepositContract()
      );
      const nodeInfoOf = await nodeDepositContract.methods
        .nodeInfoOf(metaMaskAccount)
        .call();

      // console.log({ nodeInfoOf });
      // console.log(nodeInfoOf._nodeType);

      setIsTrust(
        nodeInfoOf && nodeInfoOf._nodeType === ValidatorNodeType.Trusted
      );
    } catch (err: unknown) {}
  }, [metaMaskAccount]);

  useEffect(() => {
    updateStatus();
  }, [updateStatus]);

  return { isTrust };
}
