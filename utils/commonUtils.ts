import {
  CANCELLED_ERR_MESSAGE1,
  CANCELLED_ERR_MESSAGE2,
} from "constants/common";
import { DisplayPubkeyStatus, PubkeyStatus } from "interfaces/common";

/**
 * create uuid
 * @returns uuid
 */
export function uuid() {
  try {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        let r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;

        return v.toString(16);
      }
    );
  } catch {
    return "";
  }
}

/**
 * open link in new tab
 * @param url link's url
 */
export function openLink(url: string | undefined | null) {
  if (!url) {
    return;
  }
  const otherWindow = window.open();
  if (otherWindow) {
    otherWindow.opener = null;
    otherWindow.location = url;
  }
}

/**
 * Check is EVM cancel tx error.
 * @param err error message
 * @returns
 */
export const isEvmTxCancelError = (err: any) => {
  return (
    err.code === 4001 ||
    err.message.indexOf(CANCELLED_ERR_MESSAGE1) >= 0 ||
    err.message.indexOf(CANCELLED_ERR_MESSAGE2) >= 0
  );
};

/**
 * Get chain pubkey status display text.
 * @param status pubkey status value
 */
export const getPubkeyStatusText = (status: string) => {
  switch (Number(status)) {
    case 0:
      return "UnInitial";
    case 1:
      return "Deposited";
    case 2:
      return "Matched";
    case 3:
      return "Staked";
    case 4:
      return "Unmatched";
    case 100:
      return "Others";
    default:
      return "Unknown";
  }
};

/**
 * Get chain pubkey status display text.
 * @param status pubkey status value
 */
export const getDisplayPubkeyStatusText = (status: string | undefined) => {
  switch (Number(status)) {
    case 0:
      return "Waiting";
    case 1:
      return "Active";
    case 2:
      return "Exited";
    case 3:
      return "Withdrawal";
    default:
      return "Unknown";
  }
};

/**
 * Check pubkey status, whether it's stakeable.
 * @param status pubkey status value
 */
export const isPubkeyStakeable = (status: string) => {
  // return true;
  switch (Number(status)) {
    case 1:
    case 2:
      return true;
    default:
      return false;
  }
};

/**
 * Get matched beacon api status list of PubkeyStatus
 * @param status pubkey status value
 */
export const getBeaconStatusListOfPubkeyStatus = (status: PubkeyStatus) => {
  switch (status) {
    case PubkeyStatus.Unmatched:
      return ["PENDING_INITIALIZED"];
    case PubkeyStatus.Staked:
      return [
        "PENDING_QUEUED",
        "ACTIVE_ONGOING",
        "ACTIVE_EXITING",
        "ACTIVE_SLASHED",
        "ACTIVE",
        "PENDING",
      ];
    case PubkeyStatus.Others:
      return [
        "EXITED_UNSLASHED",
        "EXITED_SLASHED",
        "WITHDRAWAL_POSSIBLE",
        "WITHDRAWAL_DONE",
        "EXITED",
        "WITHDRAWAL",
        undefined,
      ];
    default:
      return [];
  }
};

/**
 * Get matched beacon api status list of DisplayPubkeyStatus
 * @param status pubkey status value
 */
export const getBeaconStatusListOfDisplayPubkeyStatus = (
  status: DisplayPubkeyStatus
) => {
  switch (status) {
    case DisplayPubkeyStatus.Waiting:
      return ["PENDING_INITIALIZED", "PENDING_QUEUED", "PENDING", undefined];
    case DisplayPubkeyStatus.Active:
      return ["ACTIVE_ONGOING", "ACTIVE_EXITING", "ACTIVE_SLASHED", "ACTIVE"];
    case DisplayPubkeyStatus.Exited:
      return ["EXITED_UNSLASHED", "EXITED_SLASHED", "EXITED"];
    case DisplayPubkeyStatus.Withdrawal:
      return ["WITHDRAWAL_POSSIBLE", "WITHDRAWAL_DONE", "WITHDRAWAL"];
    default:
      return [];
  }
};

/**
 * Get chain DisplayPubkeyStatus.
 * @param status pubkey status value
 */
export const getDisplayPubkeyStatusFromBeaconStatus = (
  beaconStatus: string | undefined
) => {
  if (
    getBeaconStatusListOfDisplayPubkeyStatus(
      DisplayPubkeyStatus.Waiting
    ).indexOf(beaconStatus) >= 0
  ) {
    return DisplayPubkeyStatus.Waiting;
  } else if (
    getBeaconStatusListOfDisplayPubkeyStatus(
      DisplayPubkeyStatus.Active
    ).indexOf(beaconStatus) >= 0
  ) {
    return DisplayPubkeyStatus.Active;
  } else if (
    getBeaconStatusListOfDisplayPubkeyStatus(
      DisplayPubkeyStatus.Exited
    ).indexOf(beaconStatus) >= 0
  ) {
    return DisplayPubkeyStatus.Exited;
  } else if (
    getBeaconStatusListOfDisplayPubkeyStatus(
      DisplayPubkeyStatus.Withdrawal
    ).indexOf(beaconStatus) >= 0
  ) {
    return DisplayPubkeyStatus.Withdrawal;
  }
};
