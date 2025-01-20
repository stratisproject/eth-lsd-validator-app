import { useAppSlice } from "hooks/selector";
import classNames from "classnames";
import { BackNavigation } from "./BackNavigation";

type Props = React.PropsWithChildren<{
  showBackButton?: boolean;
  onClickBack?: () => void;
}>;

export const PageTitleContainer = (props: Props) => {
  const { showBackButton, onClickBack } = props;
  const { darkMode } = useAppSlice();

  return (
    <div
      className={classNames("flex justify-center items-center", "py-[20px] px-[.1rem]")}
      style={{
        background: "linear-gradient(180deg, #f3dbff00 -20.69%, #7d53ff20 103.45%)",
        boxShadow: "0px 1px 0px #8974ffa3 "
      }}
    >
      <div className="w-full max-w-[1280px] flex flex-col">
        {showBackButton && onClickBack && (
          <div className="mb-[.24rem]">
            <BackNavigation onClick={onClickBack} />
          </div>
        )}

        <div>{props.children}</div>
      </div>
    </div>
  );
};
