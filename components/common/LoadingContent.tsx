import { CircularLoading } from "./CircularLoading";
import { PrimaryLoading } from "./PrimaryLoading";

export const LoadingContent = () => {
  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center">
      <PrimaryLoading size=".5rem" />
    </div>
  );
};
