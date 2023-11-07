import { getNetworkBalanceContract } from "config/contract";
import { getNetworkBalanceContractAbi } from "config/contractAbi";
import { useCallback, useEffect, useState } from "react";
import { getEthWeb3 } from "utils/web3Utils";

export function useRewardUpdateHour() {
  const [rewardUpdateHour, setRewardUpdateHour] = useState<string>();

  const updateData = useCallback(async () => {
    try {
      const web3 = getEthWeb3();

      const networkBalanceContract = new web3.eth.Contract(
        getNetworkBalanceContractAbi(),
        getNetworkBalanceContract(),
        {}
      );

      const updateBalancesEpochs = await networkBalanceContract.methods
        .updateBalancesEpochs()
        .call()
        .catch((err: any) => {
          console.log({ err });
        });

      const updateHours = (Number(updateBalancesEpochs) * 6.4) / 60;
      setRewardUpdateHour(Math.round(updateHours) + "");
    } catch (err: any) {
      console.log({ err });
    }
  }, []);

  useEffect(() => {
    updateData();
  }, [updateData]);

  return { rewardUpdateHour };
}
