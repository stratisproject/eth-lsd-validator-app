import React, { useState } from "react";
import { NavigationItem } from "interfaces/common";
import Head from "next/head";
import { HideOnScroll } from "components/common/HideOnScroll";
import { AppBar } from "@mui/material";
import dynamic from "next/dynamic";
import { useInit } from "hooks/useInit";
import classNames from "classnames";
import { useAppSlice } from "hooks/selector";
import { roboto } from "config/font";
import { WithdrawLoadingModal } from "components/modal/WithdrawLoadingModal";
import { WithdrawLoadingSidebar } from "components/modal/WithdrawLoadingSidebar";
import { getAppTitle } from "utils/configUtils";
import { DepositLoadingModal } from "components/modal/DepositLoadingModal";
import { DepositLoadingSidebar } from "components/modal/DepositLoadingSidebar";

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

export const MyLayoutContext = React.createContext<{
  navigation: NavigationItem[] | undefined;
  setNavigation: any;
}>({
  navigation: undefined,
  setNavigation: undefined,
});

export const Layout = (props: React.PropsWithChildren) => {
  useInit();

  const { darkMode } = useAppSlice();

  const [navigation, setNavigation] = useState<NavigationItem[]>([]);

  return (
    <MyLayoutContext.Provider
      value={{
        navigation,
        setNavigation,
      }}
    >
      <div className={classNames(darkMode ? "dark" : "bg-[#101112]", roboto.className)}>
        <Head>
          <title>{getAppTitle()}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index,follow" />
          <meta name="description" content="Strax Staking Validator App" />
          <meta name="twitter:image" content="/splash.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="STRAX Validator APP" />
          <meta name="twitter:description" content="Strax Staking Validator App" />

          <meta property="og:title" content="STRAX Validator APP" />
          <meta property="og:description" content="Strax Staking Validator App" />

          <meta property="og:type" content="website" />
          <meta property="og:image" content="/splash.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="600" />
          <meta property="og:locale" content="en" />

          <meta name="description" content="Strax Staking Validator App" />
        </Head>

        <HideOnScroll>
          <AppBar
            position="fixed"
            color="transparent"
            elevation={0}
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Navbar />
          </AppBar>
        </HideOnScroll>

        <main className="flex flex-col items-center pt-[1.16rem] max-[800px]:pt-[1.8rem] h-auto">
          <div className="mb-[1rem] w-full">{props.children}</div>
        </main>

        <DepositLoadingModal />

        <WithdrawLoadingModal />

        <div className="fixed right-0 top-[4rem]">
          <DepositLoadingSidebar />

          <WithdrawLoadingSidebar />
        </div>
      </div>
    </MyLayoutContext.Provider>
  );
};
