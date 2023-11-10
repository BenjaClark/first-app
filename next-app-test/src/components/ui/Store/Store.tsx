"use client";

import React, { useContext } from "react";

import styles from "./Store.module.scss";
import StoreContext from "@/context/StoreContext";

interface IButton {
  label?: string;
  bgColor?: string;
}

const Store = ({ label, bgColor }: IButton) => {
  const { store, color } = useContext(StoreContext);

  return (
    <div className={styles.button}>
      <button style={{ backgroundColor: color }}>{store}</button>
    </div>
  );
};

export default Store;
