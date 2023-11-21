"use client";
import React, { ReactNode } from "react";

import styles from "./Screen.module.scss";

interface IScreen {
  children: ReactNode;
  valign?: string;
  halign?: string;
  height?: string;
}

const Screen = ({ children, valign, halign, height }: IScreen) => {
  return (
    <div
      className={styles.screen}
      style={{
        justifyContent: halign,
        alignContent: valign,
        height: height,
      }}
    >
      {children}
    </div>
  );
};

export default Screen;
