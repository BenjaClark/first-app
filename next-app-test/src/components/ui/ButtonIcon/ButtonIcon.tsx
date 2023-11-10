"use client";

import React from "react";

import styles from "./ButtonIcon.module.scss";

interface IButtonIcon {
  onClick?: () => void;
  icon: string;
}

const ButtonIcon = ({ onClick, icon }: IButtonIcon) => {
  return (
    <button className={styles.buttonIcon} onClick={onClick}>
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
};

export default ButtonIcon;
