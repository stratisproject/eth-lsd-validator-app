import networkBalanceContractAbi from "./abi/networkBalance.json";
import networkWithdrawContractAbi from "./abi/networkWithdraw.json";
import lsdTokenContractAbi from "./abi/lsdToken.json";
import nodeDepositContractAbi from "./abi/nodeDeposit.json";
import userDepositContractAbi from "./abi/userDeposit.json";

/**
 * get lsdETH token contract ABI
 */
export function getLsdEthTokenContractAbi() {
  return lsdTokenContractAbi;
}

/**
 * get ETH deposit contract ABI
 */
export function getEthDepositContractAbi() {
  return userDepositContractAbi;
}

/**
 * get networkBalance contract ABI
 */
export function getNetworkBalanceContractAbi() {
  return networkBalanceContractAbi;
}

/**
 * get nodeDeposit contract ABI
 */
export function getNodeDepositContractAbi() {
  return nodeDepositContractAbi;
}

/**
 * get networkWithdraw contract ABI
 */
export function getNetworkWithdrawContractAbi() {
  return networkWithdrawContractAbi;
}
