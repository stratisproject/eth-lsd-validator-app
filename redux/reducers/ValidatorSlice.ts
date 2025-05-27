import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import chunk from 'lodash/chunk'
import {
  getNetworkWithdrawContract,
  getNodeDepositContract,
  getMulticall3Contract,
} from "config/contract";
import {
  getNetworkWithdrawContractAbi,
  getNodeDepositContractAbi,
  getMulticall3ContractAbi,
} from "config/contractAbi";
import {
  getTrustValidatorDepositAmount,
  getValidatorTotalDepositAmount,
} from "config/env";
import { getEtherScanTxUrl } from "config/explorer";
import {
  CANCELLED_MESSAGE,
  COMMON_ERROR_MESSAGE,
  CONNECTION_ERROR_MESSAGE,
  TRANSACTION_FAILED_MESSAGE,
} from "constants/common";
import dayjs from "dayjs";
import {
  IpfsRewardItem,
  NodePubkeyInfo,
  TokenWithdrawInfo,
  ValidatorClaimType,
} from "interfaces/common";
import { AppThunk } from "redux/store";
import { fetchPubkeyStatus } from "utils/apiUtils";
import { isEvmTxCancelError, uuid } from "utils/commonUtils";
import { getTokenName } from "utils/configUtils";
import { formatNumber, formatScientificNumber } from "utils/numberUtils";
import snackbarUtil from "utils/snackbarUtils";
import { getShortAddress } from "utils/stringUtils";
import { createWeb3, getEthWeb3 } from "utils/web3Utils";
import { parseEther } from "viem";
import Web3 from "web3";
import {
  addNotice,
  setDepositLoadingParams,
  setUpdateFlag,
  setValidatorStakeLoadingParams,
  setWithdrawLoadingParams,
  updateDepositLoadingParams,
  updateValidatorStakeLoadingParams,
  updateWithdrawLoadingParams,
} from "./AppSlice";
import { setEthTxLoading, updateEthBalance } from "./EthSlice";

export interface ValidatorState {
  validatorWithdrawalCredentials: string;
  claimRewardsLoading: boolean;
  withdrawLoading: boolean;
  nodePubkeys: NodePubkeyInfo[] | undefined;
}

const initialState: ValidatorState = {
  validatorWithdrawalCredentials: "--",
  claimRewardsLoading: false,
  withdrawLoading: false,
  nodePubkeys: undefined,
};

export const validatorSlice = createSlice({
  name: "eth",
  initialState,
  reducers: {
    setValidatorWithdrawalCredentials: (
      state: ValidatorState,
      action: PayloadAction<string>
    ) => {
      state.validatorWithdrawalCredentials = action.payload;
    },
    setClaimRewardsLoading: (
      state: ValidatorState,
      action: PayloadAction<boolean>
    ) => {
      state.claimRewardsLoading = action.payload;
    },
    setWithdrawLoading: (
      state: ValidatorState,
      action: PayloadAction<boolean>
    ) => {
      state.withdrawLoading = action.payload;
    },
    setNodePubkeys: (
      state: ValidatorState,
      action: PayloadAction<NodePubkeyInfo[]>
    ) => {
      state.nodePubkeys = action.payload;
    },
  },
});

export const {
  setValidatorWithdrawalCredentials,
  setClaimRewardsLoading,
  setWithdrawLoading,
  setNodePubkeys,
} = validatorSlice.actions;

export default validatorSlice.reducer;

export const updateValidatorWithdrawalCredentials =
  (): AppThunk => async (dispatch, getState) => {
    try {
      let web3 = getEthWeb3();
      let contract = new web3.eth.Contract(
        getNodeDepositContractAbi(),
        getNodeDepositContract(),
        {
          // from: account,
        }
      );

      const res = await contract.methods.withdrawCredentials().call();
      dispatch(setValidatorWithdrawalCredentials(res.slice(2)));
    } catch (err: unknown) {}
  };

export const updateNodePubkeys = (): AppThunk => async (dispatch, getState) => {
  try {
    const nodeAddress = getState().wallet.metaMaskAccount;

    if (!nodeAddress) {
      dispatch(setNodePubkeys([]));
      return;
    }

    const web3 = getEthWeb3();
    const multicall3Contract = new web3.eth.Contract(
      getMulticall3ContractAbi(),
      getMulticall3Contract(),
    )
    
    const nodeDepositContract = new web3.eth.Contract(
      getNodeDepositContractAbi(),
      getNodeDepositContract(),
      {
        from: nodeAddress,
      }
    );

    const pubkeysOfNode = await nodeDepositContract.methods
      .getPubkeysOfNode(nodeAddress)
      .call()
      .catch((err: any) => {
        console.log({ err });
      });

    if (pubkeysOfNode.length === 0) {
      dispatch(setNodePubkeys([]));
      return;
    }

    const pubkeyInfoOfInf = getNodeDepositContractAbi().find(({ name }) => name === 'pubkeyInfoOf')!
    const pubkeyInfoOfCalls = pubkeysOfNode.map((address: string) => ({
      target: getNodeDepositContract(),
      callData: web3.eth.abi.encodeFunctionCall(pubkeyInfoOfInf, [address])
    }))

    const pubkeyInfosResult = await multicall3Contract.methods.aggregate(pubkeyInfoOfCalls).call()
    const pubkeyInfos: any[] = pubkeyInfosResult.returnData.map((r: string) => web3.eth.abi.decodeParameter({
      PubkeyInfo: {
        _status: 'uint8',
        _owner: 'address',
        _nodeDepositAmount: 'uint256',
        _depositBlock: 'uint256',
      }
    }, r))

    const beaconStatusResJson = await Promise.all(chunk(pubkeysOfNode, 50).map(pubkeys => fetchPubkeyStatus(pubkeys.join(','))))
      .then(results => 
        results.reduce((r, cur) => ({
          execution_optimistic: cur.execution_optimistic,
          finalized: cur.finalized,
          data: [...(r.data || []), ...cur.data],
        }), {})
      )

    const nodePubkeyInfos: NodePubkeyInfo[] = pubkeyInfos.map((item, index) => {
      const matchedBeaconData = beaconStatusResJson.data?.find(
        (item: any) => item.validator?.pubkey === pubkeysOfNode[index]
      );
      // console.log({ item });
      // const type =
      //   item._nodeDepositAmount ===
      //   parseEther(
      //     (getTrustValidatorDepositAmount() + "") as `${number}`,
      //     "gwei"
      //   )
      //     ? "trusted"
      //     : "solo";
      const type = item._nodeDepositAmount === 0 ? "solo" : "trusted";
      // console.log({ type });
      return {
        pubkeyAddress: pubkeysOfNode[index],
        beaconApiStatus: matchedBeaconData?.status?.toUpperCase() || undefined,
        type,
        ...item,
      };
    });

    dispatch(setNodePubkeys(nodePubkeyInfos));
  } catch (err: any) {
    console.log({ err });
  }
};

export const handleEthValidatorDeposit =
  (
    type: "solo" | "trusted",
    validatorKeys: any[],
    callback?: (success: boolean, result: any) => void
  ): AppThunk =>
  async (dispatch, getState) => {
    try {
      const address = getState().wallet.metaMaskAccount;
      if (!address) {
        return;
      }

      dispatch(setEthTxLoading(true));
      dispatch(
        setDepositLoadingParams({
          modalVisible: true,
          status: "loading",
        })
      );

      const web3 = createWeb3(window.ethereum);
      let nodeDepositContract = new web3.eth.Contract(
        getNodeDepositContractAbi(),
        getNodeDepositContract(),
        {
          from: address,
        }
      );

      if (type === "solo") {
        const depositEnabled = await nodeDepositContract.methods
          .soloNodeDepositEnabled()
          .call();
        if (!depositEnabled) {
          throw Error("Solo node deposits are currently disabled");
        }
      } else {
        const nodeInfoOf = await nodeDepositContract.methods
          .nodeInfoOf(address)
          .call();

        if (nodeInfoOf._removed) {
          throw Error("Node already removed");
        }

        const trustNodePubkeyNumberLimit = await nodeDepositContract.methods
          .trustNodePubkeyNumberLimit()
          .call();

        const pubkeysOfNode = await nodeDepositContract.methods
          .getPubkeysOfNode(address)
          .call()
          .catch((err: any) => {
            console.log({ err });
          });

        if (
          Number(trustNodePubkeyNumberLimit) <
          pubkeysOfNode.length + validatorKeys.length
        ) {
          throw Error("Pubkey amount over limit");
        }

        const depositEnabled = await nodeDepositContract.methods
          .trustNodeDepositEnabled()
          .call();
        if (!depositEnabled) {
          throw Error("Trusted node deposits are currently disabled");
        }
      }

      const pubkeys: string[] = [];
      const signatures: string[] = [];
      const depositDataRoots: string[] = [];

      validatorKeys.forEach((validatorKey) => {
        pubkeys.push("0x" + validatorKey.pubkey);
        signatures.push("0x" + validatorKey.signature);
        depositDataRoots.push("0x" + validatorKey.deposit_data_root);
      });

      let sendParams = {};
      if (type === "solo") {
        const res = await nodeDepositContract.methods
          .soloNodeDepositAmount()
          .call();
        sendParams = {
          value: formatScientificNumber(res * validatorKeys.length),
        };
      }

      {
        const statusRequests = pubkeys.map((pubkey) => {
          return (async () => {
            const pubkeyInfoOf = await nodeDepositContract.methods
              .pubkeyInfoOf(pubkey)
              .call();
            const status = pubkeyInfoOf._status;
            return status;
          })();
        });

        const statusList = await Promise.all(statusRequests);

        console.log({ statusList });

        statusList.forEach((status, index) => {
          if (Number(status) !== 0) {
            throw Error(
              `pubkey ${getShortAddress(pubkeys[index], 10)} already exists`
            );
          }
        });
      }

      const result = await nodeDepositContract.methods
        .deposit(pubkeys, signatures, depositDataRoots)
        .send(sendParams);

      dispatch(setEthTxLoading(false));
      callback && callback(result?.status, result);

      if (result?.status) {
        dispatch(
          updateDepositLoadingParams({
            status: "success",
          })
        );
        dispatch(
          addNotice({
            id: result.transactionHash,
            type: "Validator Deposit",
            txDetail: {
              transactionHash: result.transactionHash,
              sender: address || "",
            },
            data: {
              type: "trusted",
              amount: "0",
              pubkeys,
            },
            scanUrl: getEtherScanTxUrl(result.transactionHash),
            status: "Confirmed",
          })
        );
      } else {
        throw new Error(TRANSACTION_FAILED_MESSAGE);
      }
    } catch (err: unknown) {
      dispatch(setEthTxLoading(false));
      if (isEvmTxCancelError(err)) {
        snackbarUtil.error(CANCELLED_MESSAGE);
        dispatch(setDepositLoadingParams(undefined));
      } else {
        // snackbarUtil.error((err as any).message);
        dispatch(
          updateDepositLoadingParams({
            status: "error",
            customMsg: (err as any).message,
          })
        );
      }
    }
  };

export const handleEthValidatorStake =
  (
    validatorKeys: any[],
    type: "solo" | "trusted",
    callback?: (success: boolean, result: any) => void
  ): AppThunk =>
  async (dispatch, getState) => {
    try {
      const address = getState().wallet.metaMaskAccount;

      dispatch(setEthTxLoading(true));
      const web3 = createWeb3(window.ethereum);
      let nodeDepositContract = new web3.eth.Contract(
        getNodeDepositContractAbi(),
        getNodeDepositContract(),
        {
          from: address,
        }
      );

      const pubkeys: string[] = [];
      const signatures: string[] = [];
      const depositDataRoots: string[] = [];

      validatorKeys.forEach((validatorKey) => {
        pubkeys.push("0x" + validatorKey.pubkey);
        signatures.push("0x" + validatorKey.signature);
        depositDataRoots.push("0x" + validatorKey.deposit_data_root);
      });

      dispatch(setEthTxLoading(true));
      dispatch(
        setValidatorStakeLoadingParams({
          modalVisible: true,
          status: "loading",
          stakeAmount:
            getValidatorTotalDepositAmount() * validatorKeys.length + "",
        })
      );

      const result = await nodeDepositContract.methods
        .stake(pubkeys, signatures, depositDataRoots)
        .send();

      dispatch(setEthTxLoading(false));
      callback && callback(result?.status, result);

      if (result?.status) {
        dispatch(
          updateValidatorStakeLoadingParams({
            status: "success",
            scanUrl: getEtherScanTxUrl(result.transactionHash),
          })
        );
        dispatch(
          addNotice({
            id: result.transactionHash,
            type: "Validator Stake",
            txDetail: {
              transactionHash: result.transactionHash,
              sender: address || "",
            },
            data: {
              type,
              amount: getValidatorTotalDepositAmount() * pubkeys.length + "",
              pubkeys,
            },
            scanUrl: getEtherScanTxUrl(result.transactionHash),
            status: "Confirmed",
          })
        );
      } else {
        throw new Error(TRANSACTION_FAILED_MESSAGE);
      }
    } catch (err: unknown) {
      dispatch(setEthTxLoading(false));
      if (isEvmTxCancelError(err)) {
        snackbarUtil.error(CANCELLED_MESSAGE);
        dispatch(setValidatorStakeLoadingParams(undefined));
      } else {
        dispatch(
          updateValidatorStakeLoadingParams({
            status: "error",
            customMsg: (err as any).message,
          })
        );
      }
    }
  };

export const claimValidatorRewards =
  (
    ipfsRewardItem: IpfsRewardItem | undefined,
    myClaimableReward: string,
    callback?: (success: boolean, result: any) => void
  ): AppThunk =>
  async (dispatch, getState) => {
    if (!ipfsRewardItem) {
      return;
    }
    const noticeUuid = uuid();

    try {
      const metaMaskAccount = getState().wallet.metaMaskAccount;
      if (!metaMaskAccount) {
        throw new Error("Please connect MetaMask");
      }

      const web3 = createWeb3(window.ethereum);
      const contract = new web3.eth.Contract(
        getNetworkWithdrawContractAbi(),
        getNetworkWithdrawContract(),
        {
          from: metaMaskAccount,
        }
      );

      dispatch(setClaimRewardsLoading(true));

      const formatProofs = ipfsRewardItem.proof
        .split(":")
        .filter(item => !!item)
        .map((item) => "0x" + item);

      const claimParams = [
        ipfsRewardItem.index,
        ipfsRewardItem.address,
        ipfsRewardItem.totalRewardAmount,
        ipfsRewardItem.totalExitDepositAmount,
        formatProofs,
        ValidatorClaimType.ClaimReward,
      ];
      const result = await contract.methods.nodeClaim(...claimParams).send();

      callback && callback(result.status, result);
      dispatch(updateEthBalance());
      dispatch(setClaimRewardsLoading(false));

      if (result && result.status) {
        const txHash = result.transactionHash;
        dispatch(
          addNotice({
            id: noticeUuid || "",
            type: "Claim Rewards",
            data: {
              rewardAmount: formatNumber(myClaimableReward),
              rewardTokenName: getTokenName(),
            },
            status: "Confirmed",
            scanUrl: getEtherScanTxUrl(txHash),
          })
        );

        // const withdrawInfo: TokenWithdrawInfo = {
        //   depositAmount: "0",
        //   rewardAmount: Web3.utils.toWei(myClaimableReward),
        //   totalAmount: Web3.utils.toWei(myClaimableReward),
        //   txHash,
        //   receivedAddress: metaMaskAccount,
        //   operateTimestamp: dayjs().unix(),
        //   timeLeft: 0,
        //   explorerUrl: getEtherScanTxUrl(txHash),
        //   status: 3,
        // };
        // addEthValidatorWithdrawRecords(withdrawInfo);

        snackbarUtil.success("Claim rewards success");
        callback && callback(true, {});
        dispatch(setUpdateFlag(dayjs().unix()));
      } else {
        throw new Error(TRANSACTION_FAILED_MESSAGE);
      }
    } catch (err: any) {
      let displayMsg = err.message || TRANSACTION_FAILED_MESSAGE;
      if (err.code === -32603) {
        displayMsg = COMMON_ERROR_MESSAGE;
      } else if (isEvmTxCancelError(err)) {
        displayMsg = CANCELLED_MESSAGE;
      }
      snackbarUtil.error(displayMsg);
    } finally {
      dispatch(setClaimRewardsLoading(false));
      dispatch(updateEthBalance());
    }
  };

export const withdrawValidatorEth =
  (
    ipfsRewardItem: IpfsRewardItem | undefined,
    withdrawAmount: string,
    myClaimableReward: string,
    isReTry: boolean,
    callback?: (success: boolean, result: any) => void
  ): AppThunk =>
  async (dispatch, getState) => {
    if (!ipfsRewardItem) {
      return;
    }
    const noticeUuid = uuid();

    try {
      const metaMaskAccount = getState().wallet.metaMaskAccount;
      if (!metaMaskAccount) {
        throw new Error("Please connect MetaMask");
      }

      const web3 = createWeb3(window.ethereum);
      const contract = new web3.eth.Contract(
        getNetworkWithdrawContractAbi(),
        getNetworkWithdrawContract(),
        {
          from: metaMaskAccount,
        }
      );

      dispatch(setWithdrawLoading(true));
      dispatch(
        setWithdrawLoadingParams({
          modalVisible: true,
          status: "loading",
          tokenAmount: withdrawAmount,
          customMsg: `Withdraw processing, please wait for a moment`,
        })
      );

      dispatch(
        updateWithdrawLoadingParams({
          customMsg: `Please confirm the ${formatNumber(
            withdrawAmount
          )} ${getTokenName()} withdraw transaction in your MetaMask wallet`,
        })
      );

      const formatProofs = ipfsRewardItem.proof
        .split(":")
        .map((item) => "0x" + item);

      const claimParams = [
        ipfsRewardItem.index,
        ipfsRewardItem.address,
        ipfsRewardItem.totalRewardAmount,
        ipfsRewardItem.totalExitDepositAmount,
        formatProofs,
        ValidatorClaimType.ClaimAll,
      ];

      const result = await contract.methods.nodeClaim(...claimParams).send();

      callback && callback(result.status, result);
      dispatch(updateEthBalance());
      if (result && result.status) {
        const txHash = result.transactionHash;
        dispatch(
          updateWithdrawLoadingParams(
            {
              status: "success",
              txHash: txHash,
              scanUrl: getEtherScanTxUrl(txHash),
              customMsg: undefined,
            },
            (newParams) => {
              dispatch(
                addNotice({
                  id: noticeUuid || "",
                  type: "Withdraw",
                  data: {
                    tokenAmount: withdrawAmount,
                  },
                  status: "Confirmed",
                  scanUrl: getEtherScanTxUrl(txHash),
                })
              );
            }
          )
        );

        const withdrawInfo: TokenWithdrawInfo = {
          depositAmount: Web3.utils.toWei(
            Math.max(0, Number(withdrawAmount) - Number(myClaimableReward)) + ""
          ),
          rewardAmount: Web3.utils.toWei(myClaimableReward),
          totalAmount: Web3.utils.toWei(withdrawAmount),
          txHash,
          receivedAddress: metaMaskAccount,
          operateTimestamp: dayjs().unix(),
          timeLeft: 0,
          explorerUrl: getEtherScanTxUrl(txHash),
          status: 4,
        };
        // addEthValidatorWithdrawRecords(withdrawInfo);
      } else {
        throw new Error(TRANSACTION_FAILED_MESSAGE);
      }
    } catch (err: any) {
      {
        let displayMsg = err.message || TRANSACTION_FAILED_MESSAGE;
        if (err.code === -32603) {
          displayMsg = CONNECTION_ERROR_MESSAGE;
        } else if (err.code === 4001) {
          snackbarUtil.error(CANCELLED_MESSAGE);
          dispatch(setWithdrawLoadingParams(undefined));
          return;
        }
        dispatch(
          updateWithdrawLoadingParams({
            status: "error",
            customMsg: displayMsg || "Unstake failed",
          })
        );
      }
    } finally {
      dispatch(setWithdrawLoading(false));
      dispatch(updateEthBalance());
    }
  };
