import { useCallback, useEffect, useState } from "react";
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

export function usePoolData() {
  const [depositedEth, setDepositedEth] = useState<string>();
  const [depositedEthValue, setDepositedEthValue] = useState<string>();
  const [mintedREth, setMintedREth] = useState<string>();
  const [mintedREthValue, setMintedREthValue] = useState<string>();
  const [stakedEth, setStakedEth] = useState<string>();
  const [stakedEthValue, setStakedEthValue] = useState<string>();
  const [allEth, setAllEth] = useState<string>();
  const [allEthValue, setAllEthValue] = useState<string>();
  const [poolEth, setPoolEth] = useState<string>();
  const [poolEthValue, setPoolEthValue] = useState<string>();
  const [unmatchedEth, setUnmatchedEth] = useState<string>();
  const [matchedValidators, setMatchedValidators] = useState<string>();
  const [stakeApr, setStakeApr] = useState<string>();
  const [validatorApr, setValidatorApr] = useState<string>();

  const udpatePoolData = useCallback(async () => {
    try {
      // const depositedEth = Web3.utils.fromWei(ethPoolData.depositedEth);
      // const mintedREth = Web3.utils.fromWei(ethPoolData.mintedREth);
      // const stakedEth = Web3.utils.fromWei(ethPoolData.stakedEth);
      // const allEth = Web3.utils.fromWei(ethPoolData.allEth);
      // const poolEth = Web3.utils.fromWei(ethPoolData.poolEth);

      // setDepositedEth(depositedEth);
      // setDepositedEthValue(
      //   Number(depositedEth) * Number(ethPoolData.ethPrice) + ""
      // );
      // setMintedREth(mintedREth);
      // setMintedREthValue(
      //   Number(mintedREth) * Number(ethPoolData.ethPrice) + ""
      // );
      // setStakedEth(stakedEth);
      // setStakedEthValue(Number(stakedEth) * Number(ethPoolData.ethPrice) + "");
      // setAllEth(allEth);
      // setAllEthValue(Number(allEth) * Number(ethPoolData.ethPrice) + "");

      // setPoolEth(poolEth);
      // setPoolEthValue(Number(poolEth) * Number(ethPoolData.ethPrice) + "");
      // setUnmatchedEth(Web3.utils.fromWei(ethPoolData.unmatchedEth));
      // setMatchedValidators(ethPoolData.matchedValidators);

      // setStakeApr(ethPoolData.stakeApr);
      // setValidatorApr(ethPoolData.validatorApr);

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

      console.log({ lsdTotalSupply });
      console.log({ lsdRate });

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
      setMintedREth(Web3.utils.fromWei(lsdTotalSupply));
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
    mintedREth,
    mintedREthValue,
    stakedEth,
    stakedEthValue,
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
