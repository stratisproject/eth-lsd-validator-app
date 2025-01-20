import classNames from "classnames";

type CustomTagProps = React.PropsWithChildren<{
  type?: "stroke" | "active" | "pending" | "apr" | "error";
  ml?: string;
}>;

export const CustomTag = (props: CustomTagProps) => {
  const { type, ml } = props;

  return (
    <div
      className={classNames(
        "rounded-[.03rem] px-[.04rem] py-[.04rem] text-[.12rem] flex items-center justify-center",
        type === "error" ? "text-error" : "text-text1",
        {
          "border-[0.01rem] border-text1/10 dark:border-text1Dark/10":
            type === "stroke"
        }
      )}
      style={{
        background:
          !type || type === "active"
            ? "linear-gradient(274.04deg, #80CAFF 31.26%, #00F3AB 117.22%)"
            : type === "pending"
            ? "#FFCD294D"
            : type === "apr"
            ? "linear-gradient(279.55deg, #7168C0  -1.42%, #412F8C 96.22%)"
            : type === "error"
            ? "#FEA4FF4D"
            : "none",
        marginLeft: ml || "0",
        padding: "5px 10px"
      }}
    >
      {props.children}
    </div>
  );
};
