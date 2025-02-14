import { isDev } from "./env";
import appDevConfig from "./appConf/dev.json";
import appProdConfig from "./appConf/prod.json";

/**
 * get lsdETH token contract address
 */
export function getLsdEthTokenContract() {
  if (isDev()) {
    return appDevConfig.contracts.lsdTokenContract.address;
  }
  return appProdConfig.contracts.lsdTokenContract.address;
}

/**
 * get ETH deposit contract address
 */
export function getEthDepositContract() {
  if (isDev()) {
    return appDevConfig.contracts.depositContract.address;
  }
  return appProdConfig.contracts.depositContract.address;
}

/**
 * get networkBalance contract address
 */
export function getNetworkBalanceContract() {
  if (isDev()) {
    return appDevConfig.contracts.networkBalanceContract.address;
  }
  return appProdConfig.contracts.networkBalanceContract.address;
}

/**
 * get nodeDeposit contract address
 */
export function getNodeDepositContract() {
  if (isDev()) {
    return appDevConfig.contracts.nodeDepositContract.address;
  }
  return appProdConfig.contracts.nodeDepositContract.address;
}

/**
 * get networkWithdraw contract address
 */
export function getNetworkWithdrawContract() {
  if (isDev()) {
    return appDevConfig.contracts.networkWithdrawContract.address;
  }
  return appProdConfig.contracts.networkWithdrawContract.address;
}

export function getMulticall3Contract() {
  return '0xcA11bde05977b3631167028862bE2a173976CA11'
}
