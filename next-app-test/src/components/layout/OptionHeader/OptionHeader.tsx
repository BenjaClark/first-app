import React, { Fragment, ReactNode } from "react";

import Header from "@/components/ui/Header";

import styles from "./OptionHeader.module.scss";
import { StoreProvider } from "@/context/StoreContext";

interface IOptionHeader {
  children: ReactNode;
}

const OptionHeader = ({ children }: IOptionHeader) => {
  return (
    <div className={styles.container}>
      <StoreProvider>
        <Header text="Pedido" />
      </StoreProvider>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default OptionHeader;
