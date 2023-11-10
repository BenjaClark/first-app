"use client";

import React, { ReactNode } from "react";

import styles from "./Screen.module.scss";
import { StoreProvider } from "@/context/StoreContext";
import { ShapeProvider } from "@/context/ShapeContext";

interface IScreen {
  children: ReactNode;
  valign?: string;
  halign?: string;
  height?: string;
}

const Screen = ({ children, valign, halign, height }: IScreen) => {
  return (
    <ShapeProvider>
      <StoreProvider>
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
      </StoreProvider>
    </ShapeProvider>
  );
};

export default Screen;
