import React from "react";

import styles from "./InputText.module.scss";

interface IText {
  label: string;
  type: string;
  placeholder: string;
  width: string;
  onChange?: any;
  value?: string;
  name?: string;
}

const inputText = ({
  label,
  type,
  placeholder,
  width,
  onChange,
  value,
  name,
}: IText) => {
  return (
    <div className={styles.InputText} style={{ width }}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
      />
    </div>
  );
};

export default inputText;
