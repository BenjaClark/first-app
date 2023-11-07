import React, { Fragment } from "react";
import NavBar from "@/components/ui/NavBar";

import styles from "./Option.module.scss";
import Menu from "@/components/ui/Menu/Menu";
import { MenuProvider } from "@/components/ui/Menu/MenuContext";

const Option = ({ children }: any) => {
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
