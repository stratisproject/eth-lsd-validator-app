import { useCallback, useEffect, useMemo, useState } from "react";
import { RootState } from "redux/store";
import Web3 from "web3";
import { useAppSelector } from "./common";
import { useAppSlice } from "./selector";
import { getEthWeb3 } from "utils/web3Utils";
import {
  getEthDepositContract,
  getLsdEthTokenContract,
  getLsdEthTokenContractAbi,
  getNetworkWithdrawContract,
  getNetworkWithdrawContractAbi,
  getNodeDepositContract,
  getNodeDepositContractAbi,
} from "config/contract";
import { usePrice } from "./usePrice";

export function usePoolData() {
  const [depositedEth, setDepositedEth] = useState<string>();
  const [depositedEthValue, setDepositedEthValue] = useState<string>();
  const [mintedLsdToken, setMintedLsdToken] = useState<string>();
  const [stakedToken, setStakedToken] = useState<string>();
  const [allEth, setAllEth] = useState<string>();
  const [allEthValue, setAllEthValue] = useState<string>();
  const [poolEth, setPoolEth] = useState<string>();
  const [poolEthValue, setPoolEthValue] = useState<string>();
  const [unmatchedEth, setUnmatchedEth] = useState<string>();
  const [matchedValidators, setMatchedValidators] = useState<string>();
  const [stakeApr, setStakeApr] = useState<string>();
  const [validatorApr, setValidatorApr] = useState<string>();

  const [lsdTotalSupply, setLsdTotalSupply] = useState<string>();
  const [lsdRate, setLsdRate] = useState<string>();

  const { tokenPrice } = usePrice();

  const mintedLsdTokenValue = useMemo(() => {
    if (
      !tokenPrice ||
      isNaN(Number(tokenPrice)) ||
      !lsdTotalSupply ||
      isNaN(Number(lsdTotalSupply)) ||
      !lsdRate ||
      isNaN(Number(lsdRate))
    ) {
      return undefined;
    }
    return Number(lsdTotalSupply) * Number(lsdRate) * Number(tokenPrice);
  }, [lsdTotalSupply, lsdRate, tokenPrice]);

  const stakedTokenValue = useMemo(() => {
    if (
      !tokenPrice ||
      isNaN(Number(tokenPrice)) ||
      !stakedToken ||
      isNaN(Number(stakedToken))
    ) {
      return undefined;
    }
    return Number(stakedToken) * Number(tokenPrice);
  }, [stakedToken, tokenPrice]);

  const udpatePoolData = useCallback(async () => {
    try {
      const web3 = getEthWeb3();

      const networkWithdrawContract = new web3.eth.Contract(
        getNetworkWithdrawContractAbi(),
        getNetworkWithdrawContract(),
        {}
      );

      const lsdTokenContract = new web3.eth.Contract(
        getLsdEthTokenContractAbi(),
        getLsdEthTokenContract(),
        {}
      );

      const lsdTotalSupply = await lsdTokenContract.methods
        .totalSupply()
        .call()
        .catch((err: any) => {
          console.log({ err });
        });

      const lsdRate = await lsdTokenContract.methods
        .getRate()
        .call()
        .catch((err: any) => {
          console.log({ err });
        });

      // console.log({ lsdTotalSupply });
      // console.log({ lsdRate });

      setLsdTotalSupply(Web3.utils.fromWei(lsdTotalSupply));
      setLsdRate(Web3.utils.fromWei(lsdRate));

      const userDepositBalance = await web3.eth.getBalance(
        getEthDepositContract()
      );

      const totalMissingAmountForWithdraw =
        await networkWithdrawContract.methods
          .totalMissingAmountForWithdraw()
          .call()
          .catch((err: any) => {
            console.log({ err });
          });

      const poolEth =
        Number(Web3.utils.fromWei(lsdTotalSupply)) *
        Number(Web3.utils.fromWei(lsdRate));
      console.log({ poolEth });

      const unmatchedEth = Web3.utils.fromWei(
        Number(userDepositBalance) - Number(totalMissingAmountForWithdraw) + ""
      );

      setPoolEth(poolEth + "");
      setUnmatchedEth(unmatchedEth);
      setMintedLsdToken(Web3.utils.fromWei(lsdTotalSupply));
    } catch {}
  }, []);

  const updateMatchedValidators = useCallback(async () => {
    try {
      const web3 = getEthWeb3();

      const nodeDepositContract = new web3.eth.Contract(
        getNodeDepositContractAbi(),
        getNodeDepositContract(),
        {}
      );

      const nodesLength = await nodeDepositContract.methods
        .getNodesLength()
        .call()
        .catch((err: any) => {
          console.log({ err });
        });

      const nodes = await nodeDepositContract.methods
        .getNodes(0, nodesLength)
        .call()
        .catch((err: any) => {
          console.log({ err });
        });

      const requests = nodes?.map((nodeAddress: string) => {
        return (async () => {
          const pubkeys = await nodeDepositContract.methods
            .getPubkeysOfNode(nodeAddress)
            .call()
            .catch((err: any) => {
              console.log({ err });
            });

          return pubkeys?.length;
        })();
      });

      const pubkeyLengthList = await Promise.all(requests);
      let matchedValidators = 0;
      pubkeyLengthList.forEach((length) => {
        matchedValidators += Number(length);
      });

      console.log({ matchedValidators });
      setMatchedValidators(matchedValidators + "");

      setStakedToken(matchedValidators * 32 + "");
    } catch (err: any) {
      console.log({ err });
    }
  }, []);

  useEffect(() => {
    udpatePoolData();
  }, [udpatePoolData]);

  useEffect(() => {
    updateMatchedValidators();
  }, [updateMatchedValidators]);

  return {
    depositedEth,
    depositedEthValue,
    mintedLsdToken,
    mintedLsdTokenValue,
    stakedToken,
    stakedTokenValue,
    allEth,
    allEthValue,
    poolEth,
    poolEthValue,
    unmatchedEth,
    matchedValidators,
    stakeApr,
    validatorApr,
  };
}
