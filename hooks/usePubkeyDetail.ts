import {
  getNetworkWithdrawContract,
  getNetworkWithdrawContractAbi,
  getNodeDepositContract,
  getNodeDepositContractAbi,
} from "config/contract";
import { NodePubkeyInfo } from "interfaces/common";
import { useCallback, useEffect, useState } from "react";
import { getEthWeb3 } from "utils/web3Utils";
import { useWalletAccount } from "./useWalletAccount";

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
        // .pubkeyInfoOf(
        //   "0xa6710aa9f9bf9e8fb01020e3a7dcca92fa9f24c07b4038d7b8437ad2082df41c01419760111c7857561da5c3d67db664"
        // )
        .call()
        .catch((err: any) => {
          console.log({ err });
        });

      // console.log({ pubkeyInfo });
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
