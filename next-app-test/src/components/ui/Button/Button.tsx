"use client";

import React from "react";

import styles from "./Button.module.scss";

interface IButton {
  label?: string;
  onClick?: () => void;
  value?: string;
  width?: string;
  isLoading?: boolean;
  backgroundColor?: string;
}

const Button = ({
  label,
  onClick,
  value,
  width,
  isLoading,
  backgroundColor,
}: IButton) => {
  return (
    <div className={styles.button} style={{ width }}>
      <button style={{ backgroundColor }} onClick={onClick}>
        {isLoading ? "Espere..." : label}
      </button>
    </div>
  );
};

export default Button;
