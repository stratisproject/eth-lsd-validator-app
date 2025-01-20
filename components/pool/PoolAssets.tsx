import classNames from "classnames";
import { CustomButton } from "components/common/CustomButton";
import { DataLoading } from "components/common/DataLoading";
import { Icomoon } from "components/icon/Icomoon";
import { getLsdAppUrl } from "config/env";
import { robotoSemiBold } from "config/font";
import { useAppSlice } from "hooks/selector";
import { usePoolData } from "hooks/usePoolData";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { formatValidatorDespositAmount, openLink } from "utils/commonUtils";
import { getLsdTokenName, getTokenName, isSupportTokenPrice } from "utils/configUtils";
import { getLsdTokenIcon } from "utils/iconUtils";
import { formatNumber } from "utils/numberUtils";

export const PoolAssets = () => {
  const router = useRouter();
  const { darkMode } = useAppSlice();
  const {
    poolEth,
    mintedLsdToken,
    unmatchedEth,
    matchedValidators,
    mintedLsdTokenValue,
    stakedToken,
    stakedTokenValue
  } = usePoolData();

  return (
    <div className="g-border-pink mt-[.24rem] rounded-[.3rem] overflow-auto">
      <div className="g-bg-box min-w-[960px] rounded-[.3rem]">
        <div
          className="h-[.7rem] grid items-center font-[500] border-solid border-b-[.01rem] border-white/10"
          style={{
            gridTemplateColumns: "16% 16% 16% 16% 16% 20%"
          }}
        >
          <div className="flex items-center justify-center text-[.16rem] text-center"></div>
          <div className="flex items-center justify-center text-[.16rem] text-center text-[#8771e3]">
            Pool {getTokenName()}
          </div>
          <div className="flex items-center justify-center text-[.16rem] text-center text-[#8771e3]">
            Minted {getLsdTokenName()}
          </div>
          <div className="flex items-center justify-center text-[.16rem] text-center text-[#8771e3]">
            Staked {getTokenName()}
          </div>
          <div className="flex items-center justify-center text-[.16rem] text-center text-[#8771e3]">
            Unmatched {getTokenName()}
          </div>
          <div className="flex items-center justify-center text-[.16rem] text-center text-[#8771e3]">
            Matched Validators
          </div>
        </div>

        <div
          className={classNames(
            "h-[1.17rem] grid items-center font-[500]",
            "bg-bgPage/50 dark:bg-bgPageDark/50 text-center"
          )}
          style={{
            gridTemplateColumns: "16% 16% 16% 16% 16% 20%"
          }}
        >
          <div className="flex items-center justify-center text-[.16rem] text-color-text1">
            <div
              className="cursor-pointer mx-[.24rem] flex-1 h-[.42rem] flex items-center justify-between rounded-[.6rem] border-[0.01rem] border-white/30"
              onClick={() => {
                openLink(getLsdAppUrl());
              }}
            >
              <div className="flex items-center">
                <div className="w-[.34rem] h-[.34rem] min-w-[.34rem] relative ml-[.04rem]">
                  <Image src={getLsdTokenIcon()} alt="logo" layout="fill" />
                </div>

                <div className="ml-[.08rem] text-[.16rem] text-color-text1">{getLsdTokenName()}</div>
              </div>

              <div className="mr-[.16rem] -rotate-90">
                <Icomoon icon="arrow-down" size=".1rem" color="white" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center text-[.16rem] text-color-text1">
            <div className="flex flex-col items-center">
              <div className={robotoSemiBold.className}>
                {poolEth === undefined ? (
                  <DataLoading height=".16rem" />
                ) : (
                  formatNumber(poolEth, { hideDecimalsForZero: true })
                )}
              </div>

              <div className="text-color-text2 mt-[.24rem] hidden">-- Contracts</div>
            </div>
          </div>

          <div className="flex items-center justify-center text-[.16rem] text-color-text1">
            <div className="flex flex-col items-center">
              <div className={robotoSemiBold.className}>
                {mintedLsdToken === undefined ? (
                  <DataLoading height=".16rem" />
                ) : (
                  formatNumber(mintedLsdToken, { hideDecimalsForZero: true })
                )}
              </div>

              <div className={classNames("text-color-text2 mt-[.24rem]", isSupportTokenPrice() ? "" : "hidden")}>
                {mintedLsdTokenValue === undefined ? (
                  <DataLoading height=".16rem" />
                ) : (
                  `$ ${formatNumber(mintedLsdTokenValue, {
                    hideDecimalsForZero: true,
                    decimals: 2
                  })}`
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center text-[.16rem] text-color-text1">
            <div className="flex flex-col items-center">
              <div className={robotoSemiBold.className}>
                {stakedToken === undefined ? (
                  <DataLoading height=".16rem" />
                ) : (
                  formatNumber(stakedToken, { hideDecimalsForZero: true })
                )}
              </div>

              <div className={classNames("text-color-text2 mt-[.24rem]", isSupportTokenPrice() ? "" : "hidden")}>
                {stakedTokenValue === undefined ? (
                  <DataLoading height=".16rem" />
                ) : (
                  `$ ${formatNumber(stakedTokenValue, {
                    hideDecimalsForZero: true,
                    decimals: 2
                  })}`
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center text-[.16rem] text-color-text1">
            <div className="flex flex-col items-center">
              <div className={robotoSemiBold.className}>
                {unmatchedEth === undefined ? (
                  <DataLoading height=".16rem" />
                ) : (
                  formatNumber(unmatchedEth, { hideDecimalsForZero: true })
                )}
              </div>
              <div className="text-color-text2 mt-[.24rem]">
                {formatValidatorDespositAmount} {getTokenName()} / Pool
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center text-[.16rem] text-color-text1">
            <div className="flex flex-col items-center">
              <div className={robotoSemiBold.className}>
                {matchedValidators === undefined ? <DataLoading height=".16rem" /> : matchedValidators}
              </div>
              <div
                className="flex items-center mt-[.24rem] cursor-pointer"
                onClick={() => {
                  router.push("/tokenStake/chooseType");
                }}
              >
                <div className="mr-[.06rem] text-center">Apply For Validator</div>

                <Icomoon icon="right" color={"#fff"} size=".12rem" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
