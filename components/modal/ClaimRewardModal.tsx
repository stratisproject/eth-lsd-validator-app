import { Box, Modal } from "@mui/material";
import classNames from "classnames";
import { CustomButton } from "components/common/CustomButton";
import { Icomoon } from "components/icon/Icomoon";
import { roboto, robotoBold, robotoSemiBold } from "config/font";
import { useAppDispatch, useAppSelector } from "hooks/common";
import { IpfsRewardItem } from "interfaces/common";
import { useRouter } from "next/router";
import { RootState } from "redux/store";
import { getTokenName } from "utils/configUtils";
import { formatNumber } from "utils/numberUtils";

interface ClaimRewardModalProps {
  visible: boolean;
  onClose: () => void;
  myRewardTokenAmount: string | undefined;
  ipfsMyRewardInfo: IpfsRewardItem | undefined;
}

export const ClaimRewardModal = (props: ClaimRewardModalProps) => {
  const { visible, onClose, myRewardTokenAmount, ipfsMyRewardInfo } = props;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { darkMode } = useAppSelector((state: RootState) => {
    return {
      darkMode: state.app.darkMode,
    };
  });

  return (
    <Modal open={visible} onClose={onClose}>
      <Box
        pt="0"
        sx={{
          backgroundColor: darkMode ? "#38475D" : "#ffffff",
          width: "5.8rem",
          borderRadius: "0.16rem",
          outline: "none",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={classNames(
            "flex-1 flex flex-col items-center",
            darkMode ? "dark" : "",
            roboto.className
          )}
        >
          <div
            className={classNames(
              "mr-[.24rem] self-end mt-[.24rem] cursor-pointer"
            )}
            onClick={onClose}
          >
            <Icomoon
              icon="close"
              size=".16rem"
              color={darkMode ? "#FFFFFF80" : "#6C86AD80"}
            />
          </div>

          <div
            className={classNames(
              "mx-[.36rem] mt-[-0.2rem] text-[.24rem] text-color-text1 font-[700] text-center leading-normal",
              robotoBold.className
            )}
          >
            Claim Rewards
          </div>

          <div className="mt-[.4rem] self-stretch bg-bgPage/50 dark:bg-bgPageDark/50 flex items-center justify-between h-[.84rem] px-[.32rem]">
            <div className="text-[.14rem] text-color-text2">Claimable</div>

            <div
              className={classNames(
                "text-color-link text-[.24rem]",
                robotoBold.className
              )}
            >
              {formatNumber(myRewardTokenAmount, { hideDecimalsForZero: true })}{" "}
              {getTokenName()}
            </div>

            <div className="text-[.14rem] text-color-text2 invisible">
              Claimable
            </div>
          </div>

          <div className="mt-[.25rem] self-stretch flex items-center justify-between px-[.32rem]">
            <div className="text-[.14rem] text-color-text2">
              Total Staked ETH
            </div>

            <div
              className={classNames(
                "text-[.14rem] text-color-text2",
                robotoSemiBold.className
              )}
            >
              --
            </div>
          </div>

          <div className="mt-[.25rem] self-stretch flex items-center justify-between px-[.32rem]">
            <div className="text-[.14rem] text-color-text2">Vesting</div>

            <div
              className={classNames(
                "text-[.14rem] text-color-text2",
                robotoSemiBold.className
              )}
            >
              -- D
            </div>
          </div>

          <div className="mt-[.25rem] self-stretch flex items-center justify-between px-[.32rem]">
            <div className="text-[.14rem] text-color-text2">My Share</div>

            <div
              className={classNames(
                "text-[.14rem] text-color-text2",
                robotoSemiBold.className
              )}
            >
              -- (--%)
            </div>
          </div>

          <div className="self-stretch m-[.24rem]">
            <CustomButton
              height=".56rem"
              disabled={Number(myRewardTokenAmount) <= 0 || !ipfsMyRewardInfo}
            >
              Claim
            </CustomButton>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
