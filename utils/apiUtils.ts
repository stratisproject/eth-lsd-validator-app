import { getBeaconHost } from "config/env";

export async function fetchPubkeyStatus(id: string) {
  if (!id) {
    return {
      execution_optimistic: false,
      finalized: false,
      data: []
    }
  }
  const response = await fetch(
    `${getBeaconHost()}/eth/v1/beacon/states/head/validators?id=${id}`,
    {
      method: "GET",
    }
  );
  const resJson = await response.json();
  return resJson;
}

export async function fetchBeaconCheckpoints() {
  const response = await fetch(
    `${getBeaconHost()}/eth/v1/beacon/states/head/finality_checkpoints`,
    {
      method: "GET",
    }
  );
  const resJson = await response.json();
  return resJson;
}
