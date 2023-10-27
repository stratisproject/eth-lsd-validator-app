import { useAppSlice } from "hooks/selector";
import Image from "next/image";
import arrowLeftImg from "public/images/arrow_left.svg";
import arrowLeftLightImg from "public/images/arrow_left_light.svg";

interface BackNavigationProps {
  onClick: () => void;
}

export const BackNavigation = (props: BackNavigationProps) => {
  const { darkMode } = useAppSlice();

  return (
    <div className="flex ">
      <div
        className="h-[.4rem] rounded-[.12rem] bg-color-bg2 text-color-text1 text-[.16rem] flex justify-between items-center px-[.16rem] gap-[.08rem] cursor-pointer"
        onClick={props.onClick}
      >
        <div className="w-[.13rem] h-[.12rem] relative text-color-text1">
          <Image
            src={darkMode ? arrowLeftLightImg : arrowLeftImg}
            layout="fill"
            alt="arrow"
          />
        </div>
        Back
      </div>
    </div>
  );
};
