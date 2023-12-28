import { hooks, metaMask } from "connectors/metaMask";
import dayjs from "dayjs";
import { useEffect } from "react";
import {
  setDarkMode,
  setUnreadNoticeFlag,
  setUpdateFlag,
} from "redux/reducers/AppSlice";
import { updateApr } from "redux/reducers/LsdEthSlice";
import {
  setMetaMaskAccount,
  setMetaMaskChainId,
  setMetaMaskDisconnected,
} from "redux/reducers/WalletSlice";
import {
  getStorage,
  STORAGE_KEY_DARK_MODE,
  STORAGE_KEY_DISCONNECT_METAMASK,
  STORAGE_KEY_UNREAD_NOTICE,
} from "utils/storageUtils";
import { useAppDispatch } from "./common";
import { useAppSlice } from "./selector";
import { useInterval } from "./useInterval";
import {
  updateEthBalance,
  updateEthLatestBlockTimestamp,
} from "redux/reducers/EthSlice";
import { useWalletAccount } from "./useWalletAccount";
import {
  updateNodePubkeys,
  updateValidatorWithdrawalCredentials,
} from "redux/reducers/ValidatorSlice";

declare const window: { ethereum: any };
declare const ethereum: any;

export function useInit() {
  const dispatch = useAppDispatch();
  const { updateFlag, darkMode } = useAppSlice();

  const { useAccount: useMetaMaskAccount } = hooks;
  const metaMaskAccount = useMetaMaskAccount();
  const { metaMaskAccount: walletMetaMaskAccount, metaMaskChainId } =
    useWalletAccount();

  useEffect(() => {
    // Init local data.
    const unreadNotice = getStorage(STORAGE_KEY_UNREAD_NOTICE);
    dispatch(setUnreadNoticeFlag(!!unreadNotice));
    dispatch(
      setMetaMaskDisconnected(!!getStorage(STORAGE_KEY_DISCONNECT_METAMASK))
    );
    dispatch(setDarkMode(!!getStorage(STORAGE_KEY_DARK_MODE)));
  }, [dispatch]);

  useEffect(() => {
    if (dispatch && updateFlag) {
      // Query eth latest block timestamp
      dispatch(updateEthLatestBlockTimestamp());
      // query apr
      dispatch(updateApr());
      // Query validator withdrawCredentials
      dispatch(updateValidatorWithdrawalCredentials());
    }
  }, [updateFlag, dispatch]);

  useInterval(() => {
    dispatch(setUpdateFlag(dayjs().unix()));
  }, 6000); // 6s

  useEffect(() => {
    if (!metaMaskAccount) {
      metaMask.connectEagerly();
    }
    // dispatch(setMetaMaskAccount("0xBABf7e6b5bcE0BD749FD3C527374bEf8919cC7A9"));
    dispatch(setMetaMaskAccount(metaMaskAccount));
  }, [dispatch, metaMaskAccount]);

  useEffect(() => {
    const listener = (chainId: any) => {
      dispatch(setMetaMaskChainId(parseInt(chainId, 16) + ""));
    };
    if (window.ethereum && window.ethereum.isMetaMask) {
      ethereum.request({ method: "eth_chainId" }).then((chainId: string) => {
        dispatch(setMetaMaskChainId(parseInt(chainId, 16) + ""));
        // clearDefaultProviderWeb3();
      });

      ethereum.on("chainChanged", listener);
    }

    return () => {
      if (window.ethereum) {
        ethereum?.removeListener("chainChanged", listener);
      }
    };
  }, [dispatch]);

  // Update wallet balances.
  useEffect(() => {
    dispatch(updateEthBalance());
  }, [dispatch, walletMetaMaskAccount, metaMaskChainId, updateFlag]);

  // Query user node pubkeys
  useEffect(() => {
    if (dispatch && updateFlag) {
      dispatch(updateNodePubkeys());
    }
  }, [updateFlag, dispatch, walletMetaMaskAccount]);

  // Change body backgroundColor
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#222C3C" : "#E8EFFD";
  }, [darkMode]);
}
