import { Popover } from "@mui/material";
import classNames from "classnames";
import { CustomButton } from "components/common/CustomButton";
import { CustomPagination } from "components/common/CustomPagination";
import { EmptyContent } from "components/common/EmptyContent";
import { LoadingContent } from "components/common/LoadingContent";
import { Icomoon } from "components/icon/Icomoon";
import { useAppSlice } from "hooks/selector";
import { useNodePubkeys } from "hooks/useNodePubkeys";
import { useWalletAccount } from "hooks/useWalletAccount";
import { DisplayPubkeyStatus, NodePubkeyInfo } from "interfaces/common";
import _ from "lodash";
import {
  bindPopover,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import Image from "next/image";
import { useRouter } from "next/router";
import checkedIcon from "public/images/checked.svg";
import { useMemo, useState } from "react";
import {
  getBeaconStatusListOfDisplayPubkeyStatus,
  getDisplayPubkeyStatusFromBeaconStatus,
  getDisplayPubkeyStatusText,
  getPubkeyStatusText,
  openLink,
} from "utils/commonUtils";
import { isSupportRestApi } from "utils/configUtils";
import snackbarUtil from "utils/snackbarUtils";
import { getShortAddress } from "utils/stringUtils";
import { MyDataNodeElection } from "./MyDataNodeElection";

export const MyDataPubkeys = () => {
  const { metaMaskAccount } = useWalletAccount();
  const [page, setPage] = useState(1);
  const [types, setTypes] = useState<DisplayPubkeyStatus[]>([]);

  const statusList = useMemo(() => {
    if (types.length === 0) {
      return undefined;
    }
    const res: (string | undefined)[] = [];
    types.forEach((type) => {
      res.push(...getBeaconStatusListOfDisplayPubkeyStatus(type));
    });
    return res;
  }, [types]);

  const displayTypesText = useMemo(() => {
    if (types.length === 0) {
      return "All Types";
    } else if (types.length === 5) {
      return "All Types";
    } else if (types.length === 1) {
      return getDisplayPubkeyStatusText(types[0]);
    } else {
      return types
        .map((status) => getDisplayPubkeyStatusText(status))
        .join(",");
    }
  }, [types]);

  const { totalCount, displayPubkeyInfos, showLoading, showEmptyContent } =
    useNodePubkeys(metaMaskAccount, page, statusList);

  const typePopupState = usePopupState({
    variant: "popover",
    popupId: "type",
  });

  return (
    <div>
      <div className="mt-[.24rem] flex items-center">
        <div
          className={classNames(
            "mr-[.24rem] cursor-pointer px-[.16rem] h-[.42rem] inline-flex items-center justify-between rounded-[.3rem] border-[0.01rem]",
            typePopupState.isOpen
              ? "border-[#ffffff00] bg-color-selected"
              : "border-[#6C86AD80]"
          )}
          {...bindTrigger(typePopupState)}
        >
          <div
            className={classNames(
              "flex-1 text-[.16rem] w-[0.8rem] flex items-center justify-center",
              typePopupState.isOpen ? "text-text1" : "text-color-text1"
            )}
            style={{
              maxLines: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 1,
              lineClamp: 1,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              wordBreak: "break-all",
            }}
          >
            {displayTypesText}
          </div>

          <div className="ml-[.2rem]">
            <Icomoon icon="arrow-down" size=".1rem" color="#848B97" />
          </div>
        </div>

        <CustomButton
          height=".42rem"
          width="1.43rem"
          onClick={() => {
            openLink("https://www.google.com");
          }}
        >
          Run Nodes
        </CustomButton>
      </div>

      <div className="mt-[.24rem] bg-color-bg2 border-[0.01rem] border-color-border1 rounded-[.3rem]">
        <div
          className="h-[.7rem] grid items-center font-[500]"
          style={{
            gridTemplateColumns: "70% 30%",
          }}
        >
          <div className="pl-[.5rem] flex items-center justify-start text-[.16rem] text-color-text2">
            Public Key List {!showLoading && `(${displayPubkeyInfos.length})`}
          </div>

          <div className="flex items-center justify-center text-[.16rem] text-color-text2">
            Status
          </div>
        </div>

        {displayPubkeyInfos.map((item, index) => (
          <MyDataPubkeyItem key={index} index={index} pubkeyInfo={item} />
        ))}

        {showEmptyContent && (
          <div className="h-[2rem] flex items-center justify-center">
            <EmptyContent />
          </div>
        )}

        {showLoading && (
          <div className="h-[2rem] flex items-center justify-center relative">
            <LoadingContent />
          </div>
        )}

        <div className="my-[.32rem] items-center justify-center hidden">
          <CustomPagination
            page={page}
            onChange={setPage}
            totalCount={totalCount || 0}
          />
        </div>
      </div>

      {isSupportRestApi() && <MyDataNodeElection />}

      <ChooseTypePopover
        popupState={typePopupState}
        types={types}
        onChangeTypes={setTypes}
        onClose={() => {
          typePopupState.close();
        }}
      />
    </div>
  );
};

interface MyDataPubkeyItemProps {
  index: number;
  pubkeyInfo: NodePubkeyInfo;
}

const MyDataPubkeyItem = (props: MyDataPubkeyItemProps) => {
  const router = useRouter();
  const { darkMode } = useAppSlice();
  const { index, pubkeyInfo } = props;

  return (
    <div
      className={classNames(
        "h-[.74rem] grid items-center font-[500]",
        index % 2 === 0 ? "bg-bgPage/50 dark:bg-bgPageDark/50" : ""
      )}
      style={{
        gridTemplateColumns: "70% 30%",
      }}
    >
      <div className="pl-[.5rem] flex items-center justify-start text-[.16rem] text-color-text2 cursor-pointer">
        <Icomoon
          icon="copy"
          size=".133rem"
          color={darkMode ? "#ffffff80" : "#6C86AD"}
          onClick={() => {
            navigator.clipboard.writeText(pubkeyInfo.pubkeyAddress).then(() => {
              snackbarUtil.success("Copy success");
            });
          }}
        />

        <div
          className="flex items-center"
          onClick={() => {
            router.push(`/pubkey/${pubkeyInfo.pubkeyAddress}`);
          }}
        >
          <div className="mx-[.06rem]">
            {getShortAddress(pubkeyInfo.pubkeyAddress, 20)}
          </div>

          <Icomoon
            icon="right1"
            size=".12rem"
            color={darkMode ? "#ffffff80" : "#6C86AD"}
          />
        </div>
      </div>

      <div className="flex items-center justify-center text-[.16rem] text-color-text1">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            router.push(`/pubkey/${pubkeyInfo.pubkeyAddress}`);
          }}
        >
          <div
            className={classNames(
              "mr-[.06rem]",
              getDisplayPubkeyStatusFromBeaconStatus(
                pubkeyInfo.beaconApiStatus
              ) === DisplayPubkeyStatus.Exited
                ? "text-error"
                : ""
            )}
          >
            {getDisplayPubkeyStatusText(
              getDisplayPubkeyStatusFromBeaconStatus(pubkeyInfo.beaconApiStatus)
            )}
          </div>

          <Icomoon
            icon="right1"
            size=".12rem"
            color={darkMode ? "#ffffff80" : "#6C86AD"}
          />
        </div>
      </div>
    </div>
  );
};

interface ChooseTypePopoverProps {
  popupState: any;
  onClose: () => void;
  types: DisplayPubkeyStatus[];
  onChangeTypes: (types: DisplayPubkeyStatus[]) => void;
}

const ChooseTypePopover = (props: ChooseTypePopoverProps) => {
  const { popupState, types, onChangeTypes, onClose } = props;
  const { darkMode } = useAppSlice();

  const onClickType = (type: DisplayPubkeyStatus) => {
    if (types.indexOf(type) >= 0) {
      onChangeTypes(_.without(types, type));
    } else {
      onChangeTypes(_.concat(types, type));
    }
  };

  return (
    <Popover
      {...bindPopover(popupState)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      elevation={0}
      sx={{
        marginTop: ".15rem",
        "& .MuiPopover-paper": {
          background: darkMode ? "#6C86AD4D" : "#ffffff80",
          border: darkMode
            ? "0.01rem solid #6C86AD80"
            : "0.01rem solid #FFFFFF",
          backdropFilter: "blur(.4rem)",
          borderRadius: ".3rem",
        },
        "& .MuiTypography-root": {
          padding: "0px",
        },
        "& .MuiBox-root": {
          padding: "0px",
        },
      }}
    >
      <div
        className={classNames("p-[.16rem] w-[3.1rem]", darkMode ? "dark" : "")}
      >
        <div
          className="cursor-pointer flex items-center justify-between"
          onClick={() => {
            onChangeTypes([]);
            // onClose();
          }}
        >
          <div className="flex items-center">
            <div className="ml-[.12rem] text-color-text1 text-[.16rem]">
              All
            </div>
          </div>

          {types.length === 0 ? (
            <div className="w-[.16rem] h-[.16rem] relative">
              <Image src={checkedIcon} alt="checked" layout="fill" />
            </div>
          ) : (
            <div className="w-[.16rem] h-[.16rem] rounded-[0.03rem] border-solid border-[1px] border-color-border3" />
          )}
        </div>

        <div className="my-[.16rem] h-[0.01rem] bg-color-divider1" />

        <div
          className="cursor-pointer flex items-center justify-between"
          onClick={() => {
            onClickType(DisplayPubkeyStatus.Waiting);
          }}
        >
          <div className="flex items-center">
            <div className="ml-[.12rem] text-color-text1 text-[.16rem]">
              Waiting
            </div>
          </div>

          {types.indexOf(DisplayPubkeyStatus.Waiting) >= 0 ? (
            <div className="w-[.16rem] h-[.16rem] relative">
              <Image src={checkedIcon} alt="checked" layout="fill" />
            </div>
          ) : (
            <div className="w-[.16rem] h-[.16rem] rounded-[0.03rem] border-solid border-[1px] border-color-border3" />
          )}
        </div>

        <div className="my-[.16rem] h-[0.01rem] bg-color-divider1" />

        <div
          className="cursor-pointer flex items-center justify-between"
          onClick={() => {
            onClickType(DisplayPubkeyStatus.Active);
          }}
        >
          <div className="flex items-center">
            <div className="ml-[.12rem] text-color-text1 text-[.16rem]">
              Active
            </div>
          </div>

          {types.indexOf(DisplayPubkeyStatus.Active) >= 0 ? (
            <div className="w-[.16rem] h-[.16rem] relative">
              <Image src={checkedIcon} alt="checked" layout="fill" />
            </div>
          ) : (
            <div className="w-[.16rem] h-[.16rem] rounded-[0.03rem] border-solid border-[1px] border-color-border3" />
          )}
        </div>

        <div className="my-[.16rem] h-[0.01rem] bg-color-divider1" />

        <div
          className="cursor-pointer flex items-center justify-between"
          onClick={() => {
            onClickType(DisplayPubkeyStatus.Exited);
          }}
        >
          <div className="flex items-center">
            <div className="ml-[.12rem] text-color-text1 text-[.16rem]">
              Exited
            </div>
          </div>

          {types.indexOf(DisplayPubkeyStatus.Exited) >= 0 ? (
            <div className="w-[.16rem] h-[.16rem] relative">
              <Image src={checkedIcon} alt="checked" layout="fill" />
            </div>
          ) : (
            <div className="w-[.16rem] h-[.16rem] rounded-[0.03rem] border-solid border-[1px] border-color-border3" />
          )}
        </div>

        <div className="my-[.16rem] h-[0.01rem] bg-color-divider1" />

        <div
          className="cursor-pointer flex items-center justify-between"
          onClick={() => {
            onClickType(DisplayPubkeyStatus.Withdrawal);
          }}
        >
          <div className="flex items-center">
            <div className="ml-[.12rem] text-color-text1 text-[.16rem]">
              Withdrawal
            </div>
          </div>

          {types.indexOf(DisplayPubkeyStatus.Withdrawal) >= 0 ? (
            <div className="w-[.16rem] h-[.16rem] relative">
              <Image src={checkedIcon} alt="checked" layout="fill" />
            </div>
          ) : (
            <div className="w-[.16rem] h-[.16rem] rounded-[0.03rem] border-solid border-[1px] border-color-border3" />
          )}
        </div>
      </div>
    </Popover>
  );
};
