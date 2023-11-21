"use client";

import React, { useContext } from "react";

import styles from "./Store.module.scss";

interface IButton {
  label?: string;
  bgColor?: string;
}

const Store = ({ label, bgColor }: IButton) => {
  return (
    <div className={styles.button}>
      <button style={{ backgroundColor: bgColor }}>{label}</button>
    </div>
  );
};

export default Store;
