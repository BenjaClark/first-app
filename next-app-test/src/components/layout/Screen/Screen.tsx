"use client";

import React, { ReactNode } from "react";

import styles from "./Screen.module.scss";
import { StoreProvider } from "@/context/StoreContext";
import { ShapeProvider } from "@/context/ShapeContext";
import MenuContext from "@/context/MenuContext";
import { FloatingBarProvider } from "@/context/FloatingBarContext";

interface IScreen {
  children: ReactNode;
  valign?: string;
  halign?: string;
  height?: string;
}

const Screen = ({ children, valign, halign, height }: IScreen) => {
  return (
    <FloatingBarProvider>
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
    </FloatingBarProvider>
  );
};

export default Screen;
