import React from "react";

import styles from "./InputSelect.module.scss";

const inputSelect = ({ label, width }: any) => {
  return (
    <div className={styles.InputSelect} style={{ width }}>
      <label>{label}</label>
      <select>
        <option>:: Seleccione ::</option>
      </select>
    </div>
  );
};

export default inputSelect;
