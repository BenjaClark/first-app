"use client";

import React from "react";

import styles from "./Store.module.scss";
import { useStore } from "@/context/StoreContext";

interface IButton {
  label?: string;
  bgColor?: string;
}

const Button = ({ label, bgColor }: IButton) => {
  return (
    <div className={styles.button}>
      <button style={{ backgroundColor: bgColor }}>{label}</button>
    </div>
  );
};

export default Button;
