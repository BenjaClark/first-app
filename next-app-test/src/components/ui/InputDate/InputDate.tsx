import React from "react";

import styles from "./InputDate.module.scss";

interface IDate {
  label: string;
  type: string;
  placeholder: string;
  width: string;
  onChange?: any;
  value?: string;
  name?: string;
}

const inputDate = ({
  label,
  type,
  placeholder,
  width,
  onChange,
  value,
  name,
}: IDate) => {
  return (
    <div className={styles.inputDate} style={{ width }}>
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

export default inputDate;
