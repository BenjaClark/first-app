"use client";

import React, { useContext } from "react";

import styles from "./Shape.module.scss";

interface IButton {
  label?: string;
  bgColor?: string;
}

const Shape = ({ label, bgColor }: IButton) => {
  return (
    <div className={styles.button}>
      <button style={{ backgroundColor: bgColor }}>{label}</button>
    </div>
  );
};

export default Shape;
