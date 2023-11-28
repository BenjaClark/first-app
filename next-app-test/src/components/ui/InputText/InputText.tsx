import React from "react";

import styles from "./InputText.module.scss";

interface IText {
  label: string;
  type: string;
  placeholder: string;
  width: string;
  onChange?: any;
  onBlur?: any;
  onFocus?: any;
  isValid?: boolean;
  value: string;
  name?: string;
}

const InputText = ({
  label,
  type,
  placeholder,
  width,
  onChange,
  onBlur,
  onFocus,
  isValid,
  value,
  name,
}: IText) => {
  return (
    <div
      className={isValid ? styles.inputText : styles.inputTextAlert}
      style={{ width }}
    >
      <label>{label}</label>
      <input
        onFocus={onFocus}
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

export default InputText;
