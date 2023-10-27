import {
  CANCELLED_ERR_MESSAGE1,
  CANCELLED_ERR_MESSAGE2,
} from "constants/common";

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
