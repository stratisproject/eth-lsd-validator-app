import classNames from "classnames";
import { useState } from "react";

interface TokenStakeListTabsProps {
  selectedTab: string;
  onChange: (tab: string) => void;
  totalCount: number | undefined;
  unmatchedCount: number | undefined;
  stakedCount: number | undefined;
  othersCount: number | undefined;
}

export const TokenStakeListTabs = (props: TokenStakeListTabsProps) => {
  const { totalCount, unmatchedCount, stakedCount, othersCount, selectedTab, onChange } = props;

  return (
    <div className="flex items-stretch bg-color-bg2 p-[.04rem]  rounded-full gap-[.1rem] max-[800px]:w-full max-[800px]:justify-between overflow-auto">
      <div
        className={classNames(
          "px-[.12rem] py-[.08rem] flex items-center justify-center relative cursor-pointer",
          selectedTab === "All"
            ? "bg-[#5F4AB7] text-white dark:text-text1 rounded-[.4rem]"
            : "text-white/50 dark:text-white"
        )}
        onClick={() => {
          onChange("All");
        }}
      >
        <div>All</div>

        <div
          className={classNames(
            "absolute right-0 top-0 w-[.16rem] h-[.16rem] items-center justify-center rounded-full",
            selectedTab === "All" ? "bg-[#6C86AD] text-white" : "bg-[#E8EFFD] text-text2",
            totalCount === undefined ? "hidden" : "flex"
          )}
        >
          <div className="scale-[.6] origin-center">{totalCount}</div>
        </div>
      </div>

      <div
        className={classNames(
          "px-[.12rem] py-[.08rem] flex items-center justify-center relative cursor-pointer",
          selectedTab === "Unmatched"
            ? "bg-[#5F4AB7] text-white dark:text-text1 rounded-[.4rem]"
            : "text-white/50 dark:text-white"
        )}
        onClick={() => {
          onChange("Unmatched");
        }}
      >
        <div>Unmatched</div>

        <div
          className={classNames(
            "absolute right-0 top-0 w-[.16rem] h-[.16rem] items-center justify-center rounded-full",
            selectedTab === "Unmatched" ? "bg-[#E8EFFD] text-[#101112]" : "bg-[#E8EFFD] text-[#101112]",
            unmatchedCount === undefined ? "hidden" : "flex"
          )}
        >
          <div className="scale-[.6] origin-center">{unmatchedCount}</div>
        </div>
      </div>

      <div
        className={classNames(
          "px-[.12rem] py-[.08rem] flex items-center justify-center relative cursor-pointer",
          selectedTab === "Staked"
            ? "bg-[#5F4AB7] text-white dark:text-text1 rounded-[.4rem]"
            : "text-white/50 dark:text-white"
        )}
        onClick={() => {
          onChange("Staked");
        }}
      >
        <div>Staked</div>

        <div
          className={classNames(
            "absolute right-0 top-0 w-[.16rem] h-[.16rem] items-center justify-center rounded-full",
            selectedTab === "Staked" ? "bg-[#E8EFFD] text-[#101112]" : "bg-[#E8EFFD] text-[#101112]",
            stakedCount === undefined ? "hidden" : "flex"
          )}
        >
          <div className="scale-[.6] origin-center">{stakedCount}</div>
        </div>
      </div>

      <div
        className={classNames(
          "px-[.12rem] py-[.08rem] flex items-center justify-center relative cursor-pointer",
          selectedTab === "Others"
            ? "bg-[#5F4AB7] text-white dark:text-text1 rounded-[.4rem]"
            : "text-white/50 dark:text-white"
        )}
        onClick={() => {
          onChange("Others");
        }}
      >
        <div>Others</div>

        <div
          className={classNames(
            "absolute right-0 top-0 w-[.16rem] h-[.16rem] items-center justify-center rounded-full",
            selectedTab === "Others" ? "bg-[#E8EFFD] text-[#101112]" : "bg-[#E8EFFD] text-[#101112]",
            othersCount === undefined ? "hidden" : "flex"
          )}
        >
          <div className="scale-[.6] origin-center">{othersCount}</div>
        </div>
      </div>
    </div>
  );
};
