import { useCallback, useEffect, useState } from "react";
import chunk from 'lodash/chunk'

import { getNodeDepositContract, getMulticall3Contract } from "config/contract";
import { getNodeDepositContractAbi, getMulticall3ContractAbi } from "config/contractAbi";
import { ChainPubkeyStatus, NodePubkeyInfo } from "interfaces/common";
import { fetchPubkeyStatus } from "utils/apiUtils";
import { getEthWeb3 } from "utils/web3Utils";

export function usePoolPubkeyData() {
  const [matchedValidators, setMatchedValidators] = useState<string>();

  const updateMatchedValidators = useCallback(async () => {
    try {
      const web3 = getEthWeb3();

      const multicall3Contract = new web3.eth.Contract(
        getMulticall3ContractAbi(),
        getMulticall3Contract(),
      )
      
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

      // Fetch all nodes pubkeys
      const getPubkeysOfNodeInf = nodeDepositContract.options.jsonInterface.find(({ name }) => name === 'getPubkeysOfNode')
      const getPubkeysOfNodeCalls = nodes?.map((address: string) => ({
        target: getNodeDepositContract(),
        callData: web3.eth.abi.encodeFunctionCall(getPubkeysOfNodeInf!, [address])
      }))

      const pubkeysResult = await multicall3Contract.methods.aggregate(getPubkeysOfNodeCalls).call()
      const pubkeyAddressList: string[] = pubkeysResult.returnData.map((r: string) => web3.eth.abi.decodeParameter('bytes[]', r)).flat()

      const beaconStatusResJson = await Promise.all(chunk(pubkeyAddressList, 50).map(pubkeys => fetchPubkeyStatus(pubkeys.join(','))))
            .then(results => 
              results.reduce((r, cur) => ({
                execution_optimistic: cur.execution_optimistic,
                finalized: cur.finalized,
                data: [...(r.data || []), ...cur.data],
              }), {})
            )

      const pubkeyInfoOfInf = nodeDepositContract.options.jsonInterface.find(({ name }) => name === 'pubkeyInfoOf')

      const pubkeyInfoOfCalls = pubkeyAddressList?.map((address: string) => ({
        target: getNodeDepositContract(),
        callData: web3.eth.abi.encodeFunctionCall(pubkeyInfoOfInf!, [address])
      }))

      const pubkeyInfoOfResult = await multicall3Contract.methods.aggregate(pubkeyInfoOfCalls).call()
      const pubkeyInfos: any[] = pubkeyInfoOfResult.returnData.map((r: string) => web3.eth.abi.decodeParameter({
        PubkeyInfo: {
          _status: 'uint8',
          _owner: 'address',
          _nodeDepositAmount: 'uint256',
          _depositBlock: 'uint256',
        }
      }, r))

      const nodePubkeyInfos: NodePubkeyInfo[] = pubkeyInfos.map(
        (item, index) => {
          const matchedBeaconData = beaconStatusResJson.data?.find(
            (item: any) => item.validator?.pubkey === pubkeyAddressList[index]
          );
          return {
            pubkeyAddress: pubkeyAddressList[index],
            beaconApiStatus:
              matchedBeaconData?.status?.toUpperCase() || undefined,
            ...item,
          };
        }
      );

      let matchedValidators = 0;
      nodePubkeyInfos.filter(({ beaconApiStatus }) => beaconApiStatus !== 'WITHDRAWAL_DONE').forEach((item) => {
        if (
          item._status === ChainPubkeyStatus.Staked &&
          item.beaconApiStatus !== "EXITED_UNSLASHED" &&
          item.beaconApiStatus !== "EXITED_SLASHED" &&
          item.beaconApiStatus !== "EXITED"
        ) {
          matchedValidators += 1;
        }

        if (
          item._status === ChainPubkeyStatus.Staked &&
          (item.beaconApiStatus === "EXITED_UNSLASHED" ||
            item.beaconApiStatus === "EXITED_SLASHED" ||
            item.beaconApiStatus === "EXITED")
        ) {
          matchedValidators += 1;
        }
      });

      setMatchedValidators(matchedValidators + "");
    } catch (err: any) {
      console.log({ err });
    }
  }, []);

  useEffect(() => {
    updateMatchedValidators();
  }, [updateMatchedValidators]);

  return {
    matchedValidators,
  };
}
