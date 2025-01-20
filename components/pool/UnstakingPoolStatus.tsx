import classNames from "classnames";
import { DataLoading } from "components/common/DataLoading";
import { robotoBold, robotoSemiBold } from "config/font";
import { useUnstakedTokenOfDay } from "hooks/useUnstakedTokenOfDay";
import { useUnstakingPoolData } from "hooks/useUnstakingPoolData";
import { getLsdTokenName, getTokenName } from "utils/configUtils";
import { formatNumber } from "utils/numberUtils";

export const UnstakingPoolStatus = () => {
  const { poolEth, unstakeawableEth, waitingStakers, ejectedValidators } = useUnstakingPoolData();

  const { unstakedTokenOfDay } = useUnstakedTokenOfDay();

  return (
    <div>
      <div className="mt-[.48rem] flex items-center flex-wrap gap-[.16rem]">
        <div className={classNames(robotoBold.className, "text-[.24rem] text-color-text1")}>Unstaking Pool Status</div>

        <div className={classNames("text-[.16rem] text-color-text2 flex items-center")}>
          {unstakedTokenOfDay === undefined ? (
            <DataLoading height=".16rem" />
          ) : (
            formatNumber(unstakedTokenOfDay, {
              hideDecimalsForZero: true
            })
          )}
          <div className="ml-[.06rem]">{getTokenName()} Unstaked today</div>
        </div>
      </div>

      <div className="g-border-pink mt-[.24rem] rounded-[.3rem] overflow-auto">
        <div className="g-bg-box rounded-[.3rem] min-w-[640px]">
          <div
            className="h-[.7rem] grid items-center font-[500] border-solid border-b-[.01rem] border-white/10"
            style={{
              gridTemplateColumns: "33% 33% 33%"
            }}
          >
            <div className="flex items-center justify-center text-[.16rem] text-[#8771e3]">Pool {getTokenName()}</div>

            {/* <div className="flex items-center justify-center text-[.16rem] text-[#8771e3]">
            Unstakeawable {getLsdTokenName()}
          </div> */}

            <div className="flex items-center justify-center text-[.16rem] text-[#8771e3]">Waiting Stakers</div>

            <div className="flex items-center justify-center text-[.16rem] text-[#8771e3]">Ejected Validators</div>
          </div>

          <div
            className={classNames(
              "h-[.7rem] grid items-center font-[500] bg-bgPage/50 dark:bg-bgPageDark/50",
              robotoSemiBold.className
            )}
            style={{
              gridTemplateColumns: "33% 33% 33%"
            }}
          >
            <div className="flex items-center justify-center text-[.16rem] text-color-text1">
              {poolEth === undefined ? (
                <DataLoading height=".16rem" />
              ) : (
                formatNumber(poolEth, {
                  hideDecimalsForZero: true
                })
              )}
            </div>

            {/* <div className="flex items-center justify-center text-[.16rem] text-color-text1">
            {unstakeawableEth === undefined ? (
              <DataLoading height=".16rem" />
            ) : (
              formatNumber(unstakeawableEth, { hideDecimalsForZero: true })
            )}
          </div> */}

            <div className="flex items-center justify-center text-[.16rem] text-color-text1">
              {waitingStakers === undefined ? <DataLoading height=".16rem" /> : waitingStakers}
            </div>

            <div className="flex items-center justify-center text-[.16rem] text-color-text1">--</div>
          </div>
        </div>
      </div>
    </div>
  );
};
