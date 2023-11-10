import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import InputText from "../InputText";
import InputSelect from "../InputSelect";
import InputDate from "../InputDate";
import Store from "../Store";
import { useStore } from "@/context/StoreContext";

const initData = {
  etiqueta: { value: "", isValid: true },
  sucursal: { value: "", isValid: true },
  fecha: { value: "", isValid: true },
};

const dataSelect = [
  { name: "opcion1", text: "Opción 1" },
  { name: "opcion2", text: "Opción 2" },
  { name: "opcion3", text: "Opción 3" },
  { name: "opcion4", text: "Opción 4" },
];

interface IHeader {
  text: string;
}

const Header = ({ text }: IHeader) => {
  const [form, setForm] = useState(initData);
  const { bgColor, label } = useStore();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: {
        value: e.target.value,
        isValid: true,
      },
    });
  };

  console.log(form);
  return (
    <div className={styles.header}>
      <ul className={styles.left}>
        <label>{text}</label>
      </ul>
      <ul className={styles.right}>
        <InputText
          type="text"
          label="Etiqueta"
          placeholder="Texto"
          width="350px"
          value={form.etiqueta.value}
          onChange={handleOnChange}
          name="etiqueta"
        />
      </ul>
      <ul className={styles.right}>
        <InputSelect
          label="Sucursal"
          width="184px"
          value={form.sucursal.value}
          onChange={handleOnChange}
          name="sucursal"
          data={dataSelect}
        />
      </ul>
      <ul className={styles.right}>
        <InputDate
          type="date"
          label="Fecha"
          placeholder="01-02-2023"
          width="138px"
          value={form.fecha.value}
          onChange={handleOnChange}
          name="fecha"
        />
      </ul>
      <ul>
        <Store label={label} bgColor={bgColor} />
      </ul>
    </div>
  );
};

export default Header;
