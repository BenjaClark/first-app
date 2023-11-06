import React, { Fragment } from "react";

import Header from "@/components/ui/Header";

import styles from "./OptionHeader.module.scss";

const OptionHeader = ({ children }: any) => {
  return (
    <div className={styles.container}>
      <Header label="Pedido" />
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default OptionHeader;
