import classNames from "classnames";
import { CustomButton } from "components/common/CustomButton";
import { DataLoading } from "components/common/DataLoading";
import { Icomoon } from "components/icon/Icomoon";
import { robotoSemiBold } from "config/font";
import { useAppSlice } from "hooks/selector";
import { usePoolData } from "hooks/usePoolData";
import Image from "next/image";
import lsdTokenLogo from "public/images/token/lsdETH.svg";
import { useMemo } from "react";
import { openLink } from "utils/commonUtils";
import { getLsdTokenName, getTokenName } from "utils/configUtils";
import { formatNumber } from "utils/numberUtils";

export const PoolAssets = () => {
  const { darkMode } = useAppSlice();
  const { poolEth, mintedREth, unmatchedEth, matchedValidators } =
    usePoolData();

  return (
    <div className="mt-[.24rem] bg-color-bg2 border-[0.01rem] border-color-border1 rounded-[.3rem]">
      <div
        className="h-[.7rem] grid items-center font-[500]"
        style={{
          gridTemplateColumns: "20% 16% 16% 16% 16% 16%",
        }}
      >
        <div className="flex items-center justify-center text-[.16rem] text-color-text2"></div>
        <div className="flex items-center justify-center text-[.16rem] text-color-text2">
          Pool {getTokenName()}
        </div>
        <div className="flex items-center justify-center text-[.16rem] text-color-text2">
          Minted {getLsdTokenName()}
        </div>
        <div className="flex items-center justify-center text-[.16rem] text-color-text2">
          Staked {getTokenName()}
        </div>
        <div className="flex items-center justify-center text-[.16rem] text-color-text2">
          Unmatched {getTokenName()}
        </div>
        <div className="flex items-center justify-center text-[.16rem] text-color-text2">
          Matched Validators
        </div>
      </div>

      <div
        className={classNames(
          "h-[1.17rem] grid items-center font-[500]",
          "bg-bgPage/50 dark:bg-bgPageDark/50"
        )}
        style={{
          gridTemplateColumns: "20% 16% 16% 16% 16% 16%",
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
          <div className="flex flex-col items-center">
            <div className={robotoSemiBold.className}>
              {poolEth === undefined ? (
                <DataLoading height=".16rem" />
              ) : (
                formatNumber(poolEth, { hideDecimalsForZero: true })
              )}
            </div>
            <div className="text-color-text2 mt-[.16rem]">-- Contracts</div>
          </div>
        </div>

        <div className="flex items-center justify-center text-[.16rem] text-color-text1">
          <div className="flex flex-col items-center">
            <div className={robotoSemiBold.className}>
              {mintedREth === undefined ? (
                <DataLoading height=".16rem" />
              ) : (
                formatNumber(mintedREth, { hideDecimalsForZero: true })
              )}
            </div>
            <div className="text-color-text2 mt-[.16rem]">$ --</div>
          </div>
        </div>

        <div className="flex items-center justify-center text-[.16rem] text-color-text1">
          <div className="flex flex-col items-center">
            <div className={robotoSemiBold.className}>--</div>
            <div className="text-color-text2 mt-[.16rem]">$ --</div>
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
            <div className="text-color-text2 mt-[.16rem]">32 ETH / Pool</div>
          </div>
        </div>

        <div className="flex items-center justify-center text-[.16rem] text-color-text1">
          <div className="flex flex-col items-center">
            <div className={robotoSemiBold.className}>
              {matchedValidators === undefined ? (
                <DataLoading height=".16rem" />
              ) : (
                matchedValidators
              )}
            </div>
            <div
              className="flex items-center mt-[.16rem] cursor-pointer"
              onClick={() => {
                openLink("https://www.google.com");
              }}
            >
              <div className="mr-[.06rem]">Apply For Validator</div>

              <Icomoon
                icon="right"
                color={darkMode ? "#ffffff80" : "#6C86AD"}
                size=".12rem"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
