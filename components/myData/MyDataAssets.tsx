import classNames from "classnames";
import { CustomButton } from "components/common/CustomButton";
import { DataLoading } from "components/common/DataLoading";
import { Icomoon } from "components/icon/Icomoon";
import { ClaimRewardModal } from "components/modal/ClaimRewardModal";
import { useMyData } from "hooks/useMyData";
import Image from "next/image";
import lsdTokenLogo from "public/images/token/lsdETH.svg";
import { useMemo, useState } from "react";
import { openLink } from "utils/commonUtils";
import { getLsdTokenName } from "utils/configUtils";
import { formatNumber } from "utils/numberUtils";

export const MyDataAssets = () => {
  const {
    selfDepositedToken,
    totalManagedToken,
    myRewardTokenAmount,
    availableExitDeposit,
    ipfsMyRewardInfo,
  } = useMyData();
  const [claimRewardModalVisible, setClaimRewardModalVisible] = useState(false);

  const showWithdraw = useMemo(() => {
    return Number(availableExitDeposit) > 0;
  }, [availableExitDeposit]);

  return (
    <div className="mt-[.24rem] bg-color-bg2 border-[0.01rem] border-color-border1 rounded-[.3rem]">
      <div
        className="h-[.7rem] grid items-center font-[500]"
        style={{
          gridTemplateColumns: "20% 20% 20% 20% 20%",
        }}
      >
        <div className="flex items-center justify-center text-[.16rem] text-color-text2"></div>
        <div className="flex items-center justify-center text-[.16rem] text-color-text2">
          Self-deposited ETH
        </div>
        <div className="flex items-center justify-center text-[.16rem] text-color-text2">
          Total Managed ETH
        </div>
        <div className="flex items-center justify-center text-[.16rem] text-color-text2">
          My Reward ETH
        </div>
        <div className="flex items-center justify-center text-[.16rem] text-color-text2">
          Slashed ETH
        </div>
      </div>

      <div
        className={classNames(
          "h-[.74rem] grid items-center font-[500]",
          "bg-bgPage/50 dark:bg-bgPageDark/50"
        )}
        style={{
          gridTemplateColumns: "20% 20% 20% 20% 20%",
        }}
      >
        <div className="flex items-center justify-center text-[.16rem] text-color-text1">
          <div
            className="cursor-pointer mx-[.24rem] flex-1 h-[.42rem] flex items-center justify-between bg-color-bgPage rounded-[.6rem] border-[0.01rem] border-color-border1"
            onClick={() => {}}
          >
            <div className="flex items-center">
              <div className="w-[.34rem] h-[.34rem] min-w-[.34rem] relative ml-[.04rem]">
                <Image src={lsdTokenLogo} alt="logo" layout="fill" />
              </div>

              <div className="ml-[.08rem] text-[.16rem] text-color-text1">
                {getLsdTokenName()}
              </div>
            </div>

            <div className="mr-[.16rem] -rotate-90">
              <Icomoon icon="arrow-down" size=".1rem" color="#848B97" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center text-[.16rem] text-color-text1">
          {selfDepositedToken === undefined ? (
            <DataLoading height=".16rem" />
          ) : (
            formatNumber(selfDepositedToken, { fixedDecimals: false })
          )}
        </div>
        <div className="flex items-center justify-center text-[.16rem] text-color-text1">
          {totalManagedToken === undefined ? (
            <DataLoading height=".16rem" />
          ) : (
            formatNumber(totalManagedToken, { fixedDecimals: false })
          )}
        </div>
        <div className="flex items-center justify-center text-[.16rem] text-color-text1">
          {myRewardTokenAmount === undefined ? (
            <DataLoading height=".16rem" />
          ) : (
            formatNumber(myRewardTokenAmount, { fixedDecimals: false })
          )}
        </div>
        <div className="flex items-center justify-center text-[.16rem] text-error">
          --
        </div>
      </div>

      <div className="my-[.32rem] flex px-[.4rem]">
        <div className="flex-1 mx-[.28rem]">
          <CustomButton
            disabled={!myRewardTokenAmount || Number(myRewardTokenAmount) <= 0}
            onClick={() => {
              setClaimRewardModalVisible(true);
            }}
          >
            Claim Rewards
          </CustomButton>
        </div>

        <div className="flex-1 mx-[.28rem]">
          <CustomButton
            type="stroke"
            onClick={() => {
              openLink("https://www.google.com");
            }}
          >
            Exit Staking
          </CustomButton>
        </div>

        {showWithdraw && (
          <div className="flex-1 mx-[.28rem]">
            <CustomButton type="stroke">Withdraw</CustomButton>
          </div>
        )}
      </div>

      <ClaimRewardModal
        ipfsMyRewardInfo={ipfsMyRewardInfo}
        myRewardTokenAmount={myRewardTokenAmount}
        visible={claimRewardModalVisible}
        onClose={() => {
          setClaimRewardModalVisible(false);
        }}
      />
    </div>
  );
};
