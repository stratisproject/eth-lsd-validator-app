import classNames from "classnames";
import { FaqItem } from "components/common/FaqItem";
import { PageTitleContainer } from "components/common/PageTitleContainer";
import { MyDataAssets } from "components/myData/MyDataAssets";
import { MyDataHistory } from "components/myData/MyDataHistory";
import { MyDataPubkeys } from "components/myData/MyDataPubkeys";
import { MyDataTabs } from "components/myData/MyDataTabs";
import { robotoBold } from "config/font";
import Image from "next/image";
import { useRouter } from "next/router";
import tokenStakeIcon from "public/images/token_stake.svg";
import { useMemo, useState } from "react";
import { getTokenName } from "utils/configUtils";

const MyDataPage = () => {
  const router = useRouter();

  const selectedTab = useMemo(() => {
    const tabParam = router.query.tab;
    if (tabParam) {
      switch (tabParam) {
        case "assets":
        case "pubkeys":
        case "history":
          return tabParam;
        default:
          return "assets";
      }
    }
    return "assets";
  }, [router.query]);

  return (
    <div>
      <PageTitleContainer>
        <div className="h-full flex items-center w-full max-w-[1280px] max-[800px]:justify-center">
          <div className="w-[.68rem] h-[.68rem] relative">
            <Image src={tokenStakeIcon} layout="fill" alt="icon" />
          </div>
          <div className={classNames(robotoBold.className, "text-[.34rem] ml-[.12rem] text-white")}>My Data</div>
        </div>
      </PageTitleContainer>

      <div className="w-full max-w-[1280px] mx-auto px-[.1rem]">
        <div className="flex max-[800px]:justify-center mt-[.24rem]">
          <MyDataTabs />
        </div>

        {selectedTab === "assets" && <MyDataAssets />}

        {selectedTab === "pubkeys" && <MyDataPubkeys />}

        {selectedTab === "history" && <MyDataHistory />}

        <div className={classNames("mt-[.56rem]")}>
          <div className="mt-[.16rem] text-[.24rem] text-[#8771e3] g-text-pink w-fit">FAQ</div>

          <div className="flex flex-wrap items-start gap-[.16rem] mt-[.16rem]">
            <FaqItem text="What are the factors that affect the staking rewards?">
              <div>
                Staking rewards in the StaFi protocol are influenced by various factors including the total amount of
                native tokens staked and redeemed, the staking rewards earned, slash occurrences, penalties, and the
                commission ratio. Slashing events, caused by disconnection or malicious behavior of validator nodes,
                could potentially reduce rewards; however, StaFi mitigates this risk by diversifying the staking funds
                across multiple validators with clean records and requiring them to provide additional deposits as
                collaterals. The staking reward claim status and the timing of claims on the original chain can also
                affect staking rewards.
              </div>

              <div className="mt-faqGap">To learn more about how staking rewards are calculated, please read:</div>

              <a
                className="block mt-faqGap text-color-link"
                href="https://docs.stafi.io/rtoken/#rtoken-exchange-rate"
                target="_blank"
                rel="noreferrer"
              >
                https://docs.stafi.io/rtoken/#rtoken-exchange-rate
              </a>
            </FaqItem>

            <FaqItem text="What are the commissions and fees associated with staking ETH?">
              Staking Reward Commission: 10% of your staking reward. 5% will be allocated to the StaFi DAO, 5% will be
              allocated to validators.
            </FaqItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDataPage;
