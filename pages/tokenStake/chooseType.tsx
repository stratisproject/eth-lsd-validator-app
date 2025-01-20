import classNames from "classnames";
import { CardContainer } from "components/common/CardContainer";
import { CustomButton } from "components/common/CustomButton";
import { ChooseTypeGuide } from "components/tokenStake/ChooseTypeGuide";
import { robotoBold } from "config/font";
import { useAppDispatch, useAppSelector } from "hooks/common";
import { useIsTrustedValidator } from "hooks/useIsTrustedValidator";
import { useSoloDepositEnabled } from "hooks/useSoloDepositEnabled";
import { useSoloNodeDepositAmount } from "hooks/useSoloNodeDepositAmount";
import { useTrustDepositEnabled } from "hooks/useTrustDepositEnabled";
import { useWalletAccount } from "hooks/useWalletAccount";
import { useRouter } from "next/router";
import { useState } from "react";
import { RootState } from "redux/store";
import { openLink } from "utils/commonUtils";
import { getTokenName } from "utils/configUtils";

const ChooseTypePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isTrust } = useIsTrustedValidator();
  const { metaMaskAccount } = useWalletAccount();

  const { soloNodeDepositAmount } = useSoloNodeDepositAmount();
  const soloDepositEnabled = useSoloDepositEnabled();
  const trustDepositEnabled = useTrustDepositEnabled();

  const soloDisabled =
    !soloDepositEnabled || !soloNodeDepositAmount || Number(soloNodeDepositAmount) === 0 || isTrust || !metaMaskAccount;

  return (
    <div className="w-full max-w-[1280px] mx-auto flex mt-[.24rem] gap-[.6rem] justify-center items-start px-[.1rem] max-[1280px]:flex-col max-[1280px]:items-center">
      <div className="w-full max-w-[720px]">
        <CardContainer width="7rem" title="Choose Validator Type">
          <div
            className="p-[.52rem] flex justify-center gap-[.12rem] max-[640px]:flex-col"
            style={{
              rowGap: ".32rem",
              columnGap: ".12rem"
            }}
          >
            <div className="w-full h-[2.11rem] rounded-[.16rem] bg-color-bgPage flex flex-col items-center justify-between">
              <div className="mt-[.32rem] flex flex-col items-center">
                <div className={classNames("text-[.16rem] text-color-text1", robotoBold.className)}>Solo Validator</div>

                <div
                  className={classNames(
                    "text-[.14rem] text-color-text2 mt-[.14rem] text-center mx-[.12rem] leading-snug"
                  )}
                >
                  Deposit {getTokenName()} to be delegated
                </div>
              </div>

              <div className="self-stretch mb-[.24rem] mx-[.16rem]">
                <CustomButton
                  height=".48rem"
                  disabled={soloDisabled}
                  onClick={() => {
                    router.push("/tokenStake/soloDeposit");
                  }}
                  className="text-white"
                >
                  Next
                </CustomButton>
              </div>
            </div>

            <div className="w-full h-[2.11rem] rounded-[.16rem] bg-color-bgPage flex flex-col items-center justify-between">
              <div className="mt-[.32rem] flex flex-col items-center">
                <div className={classNames("text-[.16rem] text-color-text1", robotoBold.className)}>
                  Trusted Validator
                </div>

                <div
                  className={classNames(
                    "text-[.14rem] text-color-text2 mt-[.14rem] mx-[.12rem] leading-snug text-center"
                  )}
                >
                  Apply to be nominated
                </div>
              </div>

              <div className="self-stretch mb-[.24rem] mx-[.16rem]">
                {!isTrust ? (
                  <CustomButton
                    height=".48rem"
                    type="stroke"
                    disabled={!trustDepositEnabled}
                    onClick={() => {
                      openLink("https://forms.gle/RtFK7qo9GzabQTCfA");
                    }}
                  >
                    Apply
                  </CustomButton>
                ) : (
                  <CustomButton
                    height=".48rem"
                    onClick={() => {
                      router.push("/tokenStake/trustDeposit");
                    }}
                  >
                    Next
                  </CustomButton>
                )}
              </div>
            </div>

            <div className="w-full h-[2.11rem] rounded-[.16rem] bg-color-bgPage flex flex-col items-center justify-between">
              <div className="mt-[.32rem] flex flex-col items-center mx-[.16rem]">
                <div className={classNames("text-[.16rem] text-color-text1", robotoBold.className)}>DVT Validator</div>

                <div
                  className={classNames(
                    "text-[.14rem] text-color-text2 mt-[.14rem] leading-snug text-center mx-[.12rem]"
                  )}
                >
                  Use 3rd Party Server, such as SSV and Obol
                </div>
              </div>

              <div className="self-stretch mb-[.24rem] mx-[.16rem]">
                <CustomButton
                  height=".48rem"
                  type="stroke"
                  onClick={() => {
                    openLink("https://docs.stafi.io/dvt/#ssv-integration");
                  }}
                >
                  Instruction
                </CustomButton>
              </div>
            </div>
          </div>
        </CardContainer>
      </div>
      <div className="w-full max-w-[480px] max-[1280px]:max-w-[720px] ">
        <ChooseTypeGuide />
      </div>
    </div>
  );
};

export default ChooseTypePage;
