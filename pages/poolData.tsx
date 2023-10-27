import classNames from "classnames";
import { PageTitleContainer } from "components/common/PageTitleContainer";
import { DelegateElection } from "components/pool/DelegateElection";
import { PoolAssets } from "components/pool/PoolAssets";
import { UnstakingPoolStatus } from "components/pool/UnstakingPoolStatus";
import { ValidatorEjection } from "components/pool/ValidatorEjection";
import { robotoBold } from "config/font";
import { useAppSlice } from "hooks/selector";
import Image from "next/image";
import { useRouter } from "next/router";
import lsdTokenIcon from "public/images/token/lsdETH.svg";
import { getLsdTokenName } from "utils/configUtils";

const PoolDataPage = () => {
  const { darkMode } = useAppSlice();
  const router = useRouter();

  return (
    <div>
      <PageTitleContainer>
        <div className="h-full flex items-center w-smallContentW xl:w-contentW 2xl:w-largeContentW">
          <div className="w-[.68rem] h-[.68rem] relative">
            <Image src={lsdTokenIcon} layout="fill" alt="icon" />
          </div>
          <div>
            <div
              className={classNames(
                robotoBold.className,
                "text-[.34rem] ml-[.12rem]"
              )}
            >
              {getLsdTokenName()} Pool
            </div>

            <div className="ml-[.12rem] mt-[.12rem] flex items-center justify-center text-[.12rem] text-color-text2 cursor-pointer">
              <div className="flex items-center">
                <div className="mr-[.06rem]">
                  Take part in rPool programs, earn tokens easily.
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTitleContainer>

      <div className="w-smallContentW xl:w-contentW 2xl:w-largeContentW mx-auto mb-[.56rem]">
        <PoolAssets />

        <UnstakingPoolStatus />

        <ValidatorEjection />

        <DelegateElection />
      </div>
    </div>
  );
};

export default PoolDataPage;
