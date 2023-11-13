import React from "react";

import styles from "./InputText.module.scss";

interface IText {
  label: string;
  type: string;
  placeholder: string;
  width: string;
  onChange?: any;
  onBlur?: any;
  value: string;
  name?: string;
}

const inputText = ({
  label,
  type,
  placeholder,
  width,
  onChange,
  onBlur,
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
        onBlur={onBlur}
        value={value}
        name={name}
      />
    </div>
  );
};

export default inputText;
