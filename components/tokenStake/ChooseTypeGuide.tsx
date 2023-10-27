import classNames from "classnames";
import { Icomoon } from "components/icon/Icomoon";
import { robotoBold } from "config/font";
import { useAppSlice } from "hooks/selector";
import { useRouter } from "next/router";

export const ChooseTypeGuide = () => {
  const { darkMode } = useAppSlice();
  const router = useRouter();

  return (
    <div className="">
      <a
        className="text-[.24rem] text-color-text1 inline-flex items-center"
        href="https://www.google.com"
        target="_blank"
        rel="noreferrer"
      >
        <div className="mr-[.16rem]">Guide</div>

        <Icomoon
          icon="right"
          color={darkMode ? "#ffffff80" : "#6C86AD"}
          size=".11rem"
        />
      </a>

      <div className="mt-[.12rem] rounded-[.16rem] w-[4.3rem] bg-[#6C86AD14] p-[.2rem] h-[3.67rem]">
        <div
          className={classNames(
            "text-color-text2 text-[.16rem]",
            robotoBold.className
          )}
        >
          Nodes Comparision
        </div>

        <div className="text-color-text2 text-[.14rem] py-[.1rem] mt-[.16rem] leading-normal">
          Deposit <span className={robotoBold.className}>4 ETH</span> to
          register as a delegated validator on StaFi;
          <div className="mt-[.1rem]" />
          StaFi will match <span className={robotoBold.className}>
            28 ETH
          </span>{" "}
          to your node so that it can meet the validator conditions of ETH2.0.
          <div className="mt-[.1rem]" />
          If you are a{" "}
          <span className={robotoBold.className}>trust validator</span>, you
          don't need to deposit.
        </div>
      </div>
    </div>
  );
};
