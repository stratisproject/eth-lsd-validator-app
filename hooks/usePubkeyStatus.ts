import { useCallback, useEffect, useState } from "react";

export function usePubkeyStatus(pubkeyAddress: string | undefined) {
  const [beaconStatus, setBeaconStatus] = useState<string>();

  const updateData = useCallback(async () => {
    if (!pubkeyAddress) {
      return;
    }

    try {
      const response = await fetch(`/api/pubkeyStatus?id=${pubkeyAddress}`, {
        method: "GET",
      });
      const resJson = await response.json();

      const matchedItem = resJson.data?.find(
        (item: any) => item.validator?.pubkey === pubkeyAddress
      );

      setBeaconStatus(matchedItem?.status?.toUpperCase() || undefined);
    } catch (err: any) {
      console.log({ err });
    }
  }, [pubkeyAddress]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  return {
    beaconStatus,
  };
}
