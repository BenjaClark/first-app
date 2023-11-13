"use client";

import React from "react";

import styles from "./Button.module.scss";

interface IButton {
  label?: string;
  onClick?: () => void;
  value?: string;
}

const Button = ({ label, onClick, value }: IButton) => {
  return (
    <div className={styles.button}>
      <button onClick={onClick}>{label}</button>
    </div>
  );
};

export default Button;
