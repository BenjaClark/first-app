import React, { Fragment, ReactNode } from "react";
import NavBar from "@/components/ui/NavBar";

import styles from "./Option.module.scss";
import Menu from "@/components/ui/Menu/Menu";
import { MenuProvider } from "@/context/MenuContext";
import { StoreProvider } from "@/context/StoreContext";

interface IOption {
  children: ReactNode;
}

const Option = ({ children }: IOption) => {
  return (
    <div className={styles.option}>
      <MenuProvider>
        <NavBar />
        <Menu />
      </MenuProvider>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default Option;
