import React from "react";

import styles from "./InputText.module.scss";

const inputText = ({label, type, placeholder} :any ) => {
  return (
    <div className={styles.inputText}>
      <label>{label}</label>
      <input type={type} placeholder={placeholder}/>
    </div>
  );
};

export default inputText;
