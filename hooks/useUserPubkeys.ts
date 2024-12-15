import { RootState } from "redux/store";
import { useAppSelector } from "./common";

export const useUserPubkeys = () => {
  const nodePubkeys = useAppSelector((state: RootState) => state.validator.nodePubkeys);

  return {
    nodePubkeys,
  };
};
