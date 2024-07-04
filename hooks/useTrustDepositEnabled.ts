import { getNodeDepositContract } from "config/contract";
import { getNodeDepositContractAbi } from "config/contractAbi";
import { useCallback, useEffect, useState } from "react";
import { getEthWeb3 } from "utils/web3Utils";

export function useTrustDepositEnabled() {
  const [enabled, setEnabled] = useState(false);

  const updateStatus = useCallback(async () => {
    try {
      const web3 = getEthWeb3();
      let nodeDepositContract = new web3.eth.Contract(
        getNodeDepositContractAbi(),
        getNodeDepositContract()
      );
      const depositEnabled = await nodeDepositContract.methods
        .trustNodeDepositEnabled()
        .call();

      setEnabled(depositEnabled);
    } catch (err: unknown) {}
  }, []);

  useEffect(() => {
    updateStatus();
  }, [updateStatus]);

  return enabled;
}
