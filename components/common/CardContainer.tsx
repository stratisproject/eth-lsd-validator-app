import classNames from "classnames";
import { robotoBold } from "config/font";

type CardContainerProps = React.PropsWithChildren<{
  width?: string;
  title: string;
}>;

export const CardContainer = (props: CardContainerProps) => {
  return (
    <div className="g-border-pink rounded-[.3rem] w-full">
      <div className="g-bg-box rounded-[.3rem]">
        <div
          className={classNames(
            "rounded-t-[.3rem] flex items-center justify-center text-[.24rem] text-color-text1 p-[16px]",
            robotoBold.className
          )}
          style={{
            background: "linear-gradient(90deg, #7168c0, #53429a)"
          }}
        >
          {props.title}
        </div>

        {props.children}
      </div>
    </div>
  );
};
