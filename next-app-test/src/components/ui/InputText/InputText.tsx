import React from "react";

import styles from "./InputText.module.scss";

const inputText = ({ label, type, placeholder, width }: any) => {
  return (
    <div className={styles.InputText} style={{ width }}>
      <label>{label}</label>
      <input type={type} placeholder={placeholder} />
    </div>
  );
};

export default inputText;
