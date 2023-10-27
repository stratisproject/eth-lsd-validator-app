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
import { NodePubkeyInfo } from "interfaces/common";

export function usePubkeyDetail(pubkeyAddress: string | undefined) {
  const { metaMaskAccount } = useWalletAccount();

  const [pubkeyInfo, setPubkeyInfo] = useState<NodePubkeyInfo>();

  const updateData = useCallback(async () => {
    if (!pubkeyAddress) {
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

      const nodeDepositContract = new web3.eth.Contract(
        getNodeDepositContractAbi(),
        getNodeDepositContract(),
        {
          from: metaMaskAccount,
        }
      );

      const pubkeyInfo = await nodeDepositContract.methods
        .pubkeyInfoOf(pubkeyAddress)
        .call()
        .catch((err: any) => {
          console.log({ err });
        });

      setPubkeyInfo({
        pubkeyAddress: pubkeyAddress,
        ...pubkeyInfo,
      });
    } catch (err: any) {
      console.log({ err });
    }
  }, [metaMaskAccount]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  return {
    pubkeyInfo,
  };
}
