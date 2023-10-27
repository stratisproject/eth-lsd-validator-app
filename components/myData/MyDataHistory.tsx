import classNames from "classnames";
import { CustomButton } from "components/common/CustomButton";
import { Icomoon } from "components/icon/Icomoon";
import Image from "next/image";
import lsdTokenLogo from "public/images/token/lsdETH.svg";
import { useMemo } from "react";
import { openLink } from "utils/commonUtils";
import { getLsdTokenName } from "utils/configUtils";

export const MyDataHistory = () => {
  const showWithdraw = useMemo(() => {
    return true;
  }, []);

  return (
    <div className="mt-[.24rem] bg-color-bg2 border-[0.01rem] border-color-border1 rounded-[.3rem]">
      <div className="mt-[.24rem] h-[.56rem] mx-[.24rem] bg-[#6C86AD14] dark:bg-[#6C86AD50] rounded-[.16rem] flex items-center justify-between pl-[.12rem] pr-[.18rem]">
        <div className="flex items-center">
          <Icomoon icon="tip" size=".2rem" />

          <div className="ml-[.06rem] text-color-text2 text-[.14rem] leading-normal">
            Holding rTokens will keep generating rewards while you depositing
            them to farm and other yield protocols, but it can't be shown in the
            est.Reward as the calculation limits.
          </div>
        </div>
      </div>

      <div
        className="h-[.7rem] grid items-center font-[500]"
        style={{
          gridTemplateColumns: "20% 16% 16% 16% 16% 16%",
        }}
      >
        <div className="flex items-center justify-center text-[.16rem] text-color-text2">
          Token Name
        </div>
        <div className="flex items-center justify-center text-[.16rem] text-color-text2">
          Time (UTC)
        </div>
        <div className="flex items-center justify-center text-[.16rem] text-color-text2">
          Kind
        </div>
        <div className="flex items-center justify-center text-[.16rem] text-color-text2">
          Transaction
        </div>
        <div className="flex items-center justify-center text-[.16rem] text-color-text2">
          Balance
        </div>
        <div className="flex items-center justify-center text-[.16rem] text-color-text2">
          Rewards
        </div>
      </div>

      <MyDataHistoryItem index={0} />
    </div>
  );
};

interface MyDataHistoryItemProps {
  index: number;
}

const MyDataHistoryItem = (props: MyDataHistoryItemProps) => {
  const { index } = props;

  return (
    <div
      className={classNames(
        "h-[.74rem] grid items-center font-[500]",
        index % 2 === 0 ? "bg-bgPage/50 dark:bg-bgPageDark/50" : ""
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
        16 April 23:00
      </div>
      <div className="flex items-center justify-center text-[.16rem] text-color-text1">
        Stake
      </div>
      <div className="flex items-center justify-center text-[.16rem] text-color-text1">
        <div className="text-link">+0.2</div>
      </div>
      <div className="flex items-center justify-center text-[.16rem] text-color-text1">
        0.8+0.2
      </div>
      <div className="flex items-center justify-center text-[.16rem] text-color-text1">
        0.05
      </div>
    </div>
  );
};
