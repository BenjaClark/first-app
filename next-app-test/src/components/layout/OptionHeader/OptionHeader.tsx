import React, { ReactNode } from "react";

import Header from "@/components/ui/Header";

import styles from "./OptionHeader.module.scss";

interface IOptionHeader {
  children: ReactNode;
}

const OptionHeader = ({ children }: IOptionHeader) => {
  return (
    <div className={styles.container}>
      <Header text="Pedido" />
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default OptionHeader;
