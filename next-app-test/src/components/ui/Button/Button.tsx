"use client";

import React from "react";

import styles from "./Button.module.scss";

interface IButton {
  label?: string;
  onClick?: () => void;
  value?: string;
  width?: string;
}

const Button = ({ label, onClick, value, width }: IButton) => {
  return (
    <div className={styles.button} style={{ width }}>
      <button onClick={onClick}>{label}</button>
    </div>
  );
};

export default Button;
