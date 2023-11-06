import React from "react";

import styles from "./Button.module.scss";

const Button = ({ label, onClick }: any) => {
  return (
    <div className={styles.Button}>
      <button onClick={onClick}>{label}</button>
    </div>
  );
};

export default Button;
