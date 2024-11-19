import { getNetworkWithdrawContract } from "config/contract";
import { useCallback, useEffect, useState } from "react";
import { decodeUnstakeLog, getEthWeb3 } from "utils/web3Utils";
import Web3 from "web3";
import { useAppSlice } from "./selector";
import { getNetworkWithdrawContractAbi } from "config/contractAbi";

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

      const topics = Web3.utils.sha3(
        "Unstake(address,uint256,uint256,uint256,bool)"
      );
      let fromBlock = currentBlock - Math.floor((1 / 15) * 60 * 60 * 24)
      if (fromBlock < 0) {
        fromBlock = 0
      }
      const events = await networkWithdrawContract.getPastEvents("allEvents", {
        fromBlock: `0x${fromBlock.toString(16)}`,
        toBlock: `0x${currentBlock.toString(16)}`,
      });

      const unstakeEvents = events
        .filter((e) => e.raw.topics.length === 1 && e.raw.topics[0] === topics)
        .sort((a, b) => a.blockNumber - b.blockNumber);

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
