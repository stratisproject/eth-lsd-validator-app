import { ValidatorKeyUpload } from "components/tokenStake/ValidatorKeyUpload";
import {
  getEthereumChainId,
  getEthereumChainName,
  getEthereumNetworkName,
} from "config/env";
import uploadIcon from "public/images/upload.svg";
import fileIcon from "public/images/file.svg";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/common";
import { RootState } from "redux/store";
import { CustomButton } from "components/common/CustomButton";
import { handleEthValidatorDeposit } from "redux/reducers/ValidatorSlice";
import { updateEthBalance } from "redux/reducers/EthSlice";
import { BackNavigation } from "components/common/BackNavigation";
import { useRouter } from "next/router";
import { CardContainer } from "components/common/CardContainer";
import classNames from "classnames";
import { robotoBold } from "config/font";
import { Icomoon } from "components/icon/Icomoon";
import { useAppSlice } from "hooks/selector";
import { usePoolData } from "hooks/usePoolData";
import { DepositGuide } from "components/tokenStake/DepositGuide";
import { ConfirmModal } from "components/modal/ConfirmModal";
import { getTokenName } from "utils/configUtils";
import { DataLoading } from "components/common/DataLoading";
import { formatNumber } from "utils/numberUtils";
import { connectMetaMask } from "redux/reducers/WalletSlice";
import { useWalletAccount } from "hooks/useWalletAccount";

const TrustDepositPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSlice();
  const [validatorKeys, setValidatorKeys] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [deleteConfirmModalVisible, setDeleteConfirmModalVisible] =
    useState(false);

  const { unmatchedEth } = usePoolData();

  const { metaMaskAccount, metaMaskChainId } = useWalletAccount();
  const { validatorWithdrawalCredentials, ethTxLoading } = useAppSelector(
    (state: RootState) => {
      return {
        metaMaskAccount: state.wallet.metaMaskAccount,
        validatorWithdrawalCredentials:
          state.validator.validatorWithdrawalCredentials,
        ethTxLoading: state.eth.txLoading,
      };
    }
  );

  const isWrongMetaMaskNetwork = useMemo(() => {
    return Number(metaMaskChainId) !== getEthereumChainId();
  }, [metaMaskChainId]);

  return (
    <div className="w-smallContentW xl:w-contentW 2xl:w-largeContentW mx-auto">
      <BackNavigation
        onClick={() => {
          router.replace("/tokenStake/chooseType");
        }}
      />

      <div className="flex mt-[.24rem] items-start">
        <CardContainer width="6.2rem" title="Trusted Validator Deposit">
          <div className="flex flex-col items-center">
            <div className="mt-[.32rem] flex items-center text-[.14rem]">
              <div
                className={classNames(
                  robotoBold.className,
                  "text-color-text1 flex items-center"
                )}
              >
                <div className="mr-[.04rem]">
                  {unmatchedEth === undefined ? (
                    <DataLoading height=".14rem" />
                  ) : (
                    formatNumber(unmatchedEth, { hideDecimalsForZero: true })
                  )}
                </div>

                {getTokenName()}
              </div>

              <div className="ml-[.06rem] text-color-text2">
                is waiting to be staked
              </div>

              <div
                className="ml-[.12rem] flex items-center text-[.14rem] text-color-text2 cursor-pointer"
                onClick={() => {
                  router.push("/poolData");
                }}
              >
                <div className="mr-[.06rem]">Pool Status</div>
                <Icomoon
                  icon="arrow-right"
                  size=".13rem"
                  color={darkMode ? "#ffffff80" : "#6C86AD"}
                />
              </div>
            </div>

            <div className="mt-[.46rem]">
              {validatorKeys.length === 0 ? (
                <ValidatorKeyUpload
                  checkValidatorKey={(validatorKey) => {
                    if (
                      !validatorKey.deposit_data_root ||
                      !validatorKey.signature ||
                      !validatorKey.pubkey
                    ) {
                      throw new Error(
                        "Miss deposit_data_root or signature or pubkey"
                      );
                    }
                    if (validatorKey.amount !== 1000000000) {
                      throw new Error(
                        "Please use trusted validator file to deposit"
                      );
                    }
                    console.log(
                      "validatorKey.withdrawal_credentials:",
                      validatorKey.withdrawal_credentials
                    );
                    if (
                      validatorKey.withdrawal_credentials !==
                      validatorWithdrawalCredentials
                    ) {
                      console.log(validatorWithdrawalCredentials);
                      console.log(validatorKey.withdrawal_credentials);

                      throw new Error(`Incorrect withdrawal_credentials value`);
                    }
                    const networkName = getEthereumNetworkName();
                    // console.log({ validatorKey });
                    if (validatorKey.eth2_network_name !== networkName) {
                      throw new Error(
                        `Please use ${networkName} validator file to deposit`
                      );
                    }
                  }}
                  onSuccess={(validatorKeys, fileName) => {
                    setValidatorKeys(validatorKeys);
                    setFileName(fileName);
                  }}
                >
                  <div>
                    <div className="flex flex-col items-center">
                      <div className="w-[.5rem] h-[.6rem] relative">
                        <Image src={uploadIcon} alt="upload" layout="fill" />
                      </div>

                      <div className="text-color-text2 text-[.14rem] mt-[.15rem]">
                        Drag and drop file
                      </div>
                    </div>
                  </div>
                </ValidatorKeyUpload>
              ) : (
                <div className="max-h-[3rem] overflow-auto">
                  {validatorKeys.map((item, index) => (
                    <div
                      key={index}
                      className="bg-color-bgPage rounded-[.16rem] h-[.66rem] w-[4.5rem] flex items-center relative"
                    >
                      <div className="ml-[.2rem] w-[.22rem] h-[.27rem] relative">
                        <Image src={fileIcon} layout="fill" alt="file" />
                      </div>

                      <div
                        className="ml-[.2rem] text-color-text2 text-[.12rem] mr-[.4rem] leading-normal"
                        style={{
                          maxLines: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitLineClamp: 2,
                          lineClamp: 2,
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        File{" "}
                        <span
                          className={classNames(
                            "text-color-text1",
                            robotoBold.className
                          )}
                        >
                          {fileName}
                        </span>{" "}
                        uploaded successfully!
                      </div>

                      <div
                        className="absolute right-[.06rem] top-[.06rem] cursor-pointer"
                        onClick={() => {
                          // setFileName("");
                          // setValidatorKeys([]);
                          setDeleteConfirmModalVisible(true);
                        }}
                      >
                        <Icomoon
                          icon="close1"
                          size=".11rem"
                          color={darkMode ? "#ffffff80" : "#6C86AD"}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="self-stretch mx-[.24rem] mt-[.46rem] mb-[.32rem]">
              <CustomButton
                height=".56rem"
                loading={ethTxLoading}
                disabled={
                  !!metaMaskAccount &&
                  !isWrongMetaMaskNetwork &&
                  (validatorKeys.length === 0 ||
                    isNaN(Number(unmatchedEth)) ||
                    Number(unmatchedEth) < validatorKeys.length)
                }
                type={
                  !metaMaskAccount || isWrongMetaMaskNetwork
                    ? "secondary"
                    : "primary"
                }
                onClick={() => {
                  if (!metaMaskAccount || isWrongMetaMaskNetwork) {
                    dispatch(connectMetaMask(getEthereumChainId()));
                    return;
                  }
                  dispatch(
                    handleEthValidatorDeposit(
                      validatorKeys,
                      (success, result) => {
                        dispatch(updateEthBalance());
                        if (success) {
                          const pubkeys: string[] = [];

                          validatorKeys.forEach((validatorKey) => {
                            pubkeys.push("0x" + validatorKey.pubkey);
                          });

                          setValidatorKeys([]);
                          setFileName("");

                          // router.push(
                          //   {
                          //     pathname: "/eth/validator/check-deposit-file",
                          //     query: {
                          //       pubkeys,
                          //       type: "trusted",
                          //       txHash: result?.transactionHash,
                          //     },
                          //   },
                          //   "/eth/validator/check-deposit-file"
                          // );
                        }
                      }
                    )
                  );
                }}
              >
                {!metaMaskAccount
                  ? "Connect Wallet"
                  : isWrongMetaMaskNetwork
                  ? "Switch Network"
                  : validatorKeys.length === 0
                  ? "Please Upload 1 json file"
                  : ethTxLoading
                  ? "Depositing, please wait for a moment..."
                  : !isNaN(Number(unmatchedEth)) &&
                    Number(unmatchedEth) < validatorKeys.length
                  ? "Insufficient ETH in pool"
                  : "Deposit"}
              </CustomButton>
            </div>
          </div>
        </CardContainer>

        <div className="ml-[.85rem]">
          <DepositGuide />
        </div>
      </div>

      <ConfirmModal
        visible={deleteConfirmModalVisible}
        onClose={() => {
          setDeleteConfirmModalVisible(false);
        }}
        onConfirm={() => {
          setValidatorKeys([]);
          setFileName("");
          setDeleteConfirmModalVisible(false);
        }}
        title="Sure Delete?"
        content="Sure you want to delete this file?"
        confirmText="Yes, Delete"
      />
    </div>
  );
};

export default TrustDepositPage;
