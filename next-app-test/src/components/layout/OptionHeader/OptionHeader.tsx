import React, { ReactNode } from "react";

import Header from "@/components/ui/Header";

import styles from "./OptionHeader.module.scss";

interface IOptionHeader {
  children: ReactNode;
  label: string;
}

const OptionHeader = ({ children, label }: IOptionHeader) => {
  return (
    <div className={styles.container}>
      <Header label={label} />
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default OptionHeader;
