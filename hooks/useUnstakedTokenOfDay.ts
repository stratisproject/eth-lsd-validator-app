import {
  getNetworkWithdrawContract,
  getNetworkWithdrawContractAbi,
} from "config/contract";
import { useCallback, useEffect, useState } from "react";
import { decodeUnstakeLog, getEthWeb3 } from "utils/web3Utils";
import Web3 from "web3";
import { useAppSlice } from "./selector";

export function useUnstakedTokenOfDay() {
  const { updateFlag } = useAppSlice();

  const [unstakedTokenOfDay, setUnstakedTokenOfDay] = useState<string>();

  const updateData = useCallback(async () => {
    try {
      const web3 = getEthWeb3();
      const networkWithdrawContract = new web3.eth.Contract(
        getNetworkWithdrawContractAbi(),
        getNetworkWithdrawContract(),
        {}
      );

      const currentBlock = await web3.eth.getBlockNumber();
      // console.log({ currentBlock });

      const topics = Web3.utils.sha3(
        "Unstake(address,uint256,uint256,uint256,bool)"
      );
      const events = await networkWithdrawContract.getPastEvents("allEvents", {
        fromBlock: currentBlock - Math.floor((1 / 12) * 60 * 60 * 24),
        toBlock: currentBlock,
      });
      // console.log({ events });

      const unstakeEvents = events
        .filter((e) => e.raw.topics.length === 1 && e.raw.topics[0] === topics)
        .sort((a, b) => a.blockNumber - b.blockNumber);

      // console.log({ unstakeEvents });

      let totalUnstakedAmount = 0;

      unstakeEvents.forEach((event) => {
        const unstakeEventLog: any = decodeUnstakeLog(
          event.raw.data,
          event.raw.topics
        );
        totalUnstakedAmount += Number(unstakeEventLog.ethAmount);
      });

      setUnstakedTokenOfDay(Web3.utils.fromWei(totalUnstakedAmount + ""));
    } catch (err: any) {
      console.log({ err });
    }
  }, [updateFlag]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  return { unstakedTokenOfDay };
}
