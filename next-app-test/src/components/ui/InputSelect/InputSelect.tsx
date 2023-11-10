import React from "react";

import styles from "./InputSelect.module.scss";

interface ISelect {
  label: string;
  width: string;
  onChange?: any;
  onSelect?: any;
  value?: string;
  name?: string;
  data?: any;
  color?: string;
}

const inputSelect = ({
  label,
  width,
  onChange,
  onSelect,
  value,
  name,
  data,
  color,
}: ISelect) => {
  return (
    <div className={styles.InputSelect} style={{ width }}>
      <label>{label}</label>
      <select
        color={color}
        onSelect={onSelect}
        onChange={onChange}
        value={value}
        name={name}
      >
        {data?.map((item: any, key: number) => (
          <option key={key} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default inputSelect;
