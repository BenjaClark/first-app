import React from "react";
import styles from "./Header.module.scss";
import InputText from "../InputText";
import InputSelect from "../InputSelect";

const Header = ({ label }: any) => {
  return (
    <div className={styles.Header}>
      <ul className={styles.left}>
        <li>
          <label>{label}</label>
        </li>
      </ul>
      <ul className={styles.right}>
        <InputText label="Etiqueta" placeholder="Texto" width="350px" />
      </ul>
      <ul className={styles.right}>
        <InputSelect label="Sucursal" width="184px" />
      </ul>
      <ul className={styles.right}>
        <InputText
          type="date"
          label="Fecha"
          placeholder="01-02-2023"
          width="138px"
        />
      </ul>
    </div>
  );
};

export default Header;
