import classNames from "classnames";
import { CustomTag } from "components/common/CustomTag";
import { PageTitleContainer } from "components/common/PageTitleContainer";
import { Icomoon } from "components/icon/Icomoon";
import { PubkeyDetailAsset } from "components/pubkey/PubkeyDetailAsset";
import { PubkeyDetailSlashHistory } from "components/pubkey/PubkeyDetailSlashHistory";
import { robotoBold } from "config/font";
import { useAppSlice } from "hooks/selector";
import { usePubkeyDetail } from "hooks/usePubkeyDetail";
import Image from "next/image";
import { useRouter } from "next/router";
import tokenStakeIcon from "public/images/token/lsdETH.svg";
import { useMemo } from "react";
import snackbarUtil from "utils/snackbarUtils";
import { getShortAddress } from "utils/stringUtils";

const PubkeyDetailPage = () => {
  const { darkMode } = useAppSlice();
  const router = useRouter();

  const pubkeyAddress: string | undefined = useMemo(() => {
    if (
      router.isReady &&
      router.query.pubkeyAddress &&
      typeof router.query.pubkeyAddress === "string"
    ) {
      return router.query.pubkeyAddress;
    } else {
      return undefined;
    }
  }, [router]);

  return (
    <div>
      <PageTitleContainer
        showBackButton
        onClickBack={() => {
          router.back();
        }}
      >
        <div className="h-full flex items-center justify-between w-smallContentW xl:w-contentW 2xl:w-largeContentW">
          <div className="flex items-center">
            <div className="w-[.68rem] h-[.68rem] relative">
              <Image src={tokenStakeIcon} layout="fill" alt="icon" />
            </div>

            <div>
              <div className="flex items-center">
                <div
                  className={classNames(
                    robotoBold.className,
                    "text-[.34rem] ml-[.12rem] text-color-text1"
                  )}
                >
                  Public Key Detail
                </div>

                <CustomTag type="active" ml=".16rem">
                  Active
                </CustomTag>
              </div>

              {pubkeyAddress && (
                <div className="ml-[.12rem] mt-[.12rem] flex items-center justify-center text-[.12rem] text-color-text2 cursor-pointer">
                  <div className="flex items-center">
                    <div className="mr-[.06rem]">
                      <span className={robotoBold.className}>Address:</span>{" "}
                      {getShortAddress(pubkeyAddress, 20)}
                    </div>
                  </div>

                  <Icomoon
                    icon="copy"
                    size=".12rem"
                    color={darkMode ? "#ffffff80" : "#6C86AD"}
                    onClick={() => {
                      navigator.clipboard.writeText(pubkeyAddress).then(() => {
                        snackbarUtil.success("Copy success");
                      });
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <div
                className={classNames(
                  robotoBold.className,
                  "text-[.34rem] ml-[.12rem]"
                )}
              >
                -- Days
              </div>
            </div>

            <div className="mt-[.12rem] flex items-center justify-center text-[.12rem] text-color-text2 cursor-pointer">
              <CustomTag type="stroke" ml=".16rem">
                Epoch --
              </CustomTag>

              <div className="ml-[.06rem]">Eligible for Activation</div>
            </div>
          </div>
        </div>
      </PageTitleContainer>

      <div className="w-smallContentW xl:w-contentW 2xl:w-largeContentW mx-auto">
        <PubkeyDetailAsset pubkeyAddress={pubkeyAddress} />

        <PubkeyDetailSlashHistory />
      </div>
    </div>
  );
};

export default PubkeyDetailPage;
