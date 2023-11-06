import React, { Fragment } from "react";
import NavBar from "@/components/ui/NavBar";

import styles from "./Option.module.scss";

const Option = ({ children }: any) => {
  return (
    <div className={styles.option}>
      <NavBar />
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default Option;
