import React from "react";

import styles from "./Screen.module.scss";

const Screen = ({ children, valign, halign, height }: any) => {
  return (
    <div
      className={styles.screen}
      style={{ justifyContent: halign, alignContent: valign, height: height }}
    >
      {children}
    </div>
  );
};

export default Screen;
