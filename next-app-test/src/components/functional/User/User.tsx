import React, { useState, useContext } from "react";
import axios from "axios";
import { ContentCell, ContentRow } from "@/components/layout/Content";
import InputText from "@/components/ui/InputText";

import Option from "@/components/layout/Option";
import Button from "@/components/ui/Button";
import styles from "./User.module.scss";

const initData = {
  rut: { value: "", isValid: true },
  name: { value: "", isValid: true },
  paternalLastName: { value: "", isValid: true },
  maternalLastName: { value: "", isValid: true },
  email: { value: "", isValid: true },
  phone: { value: "", isValid: true },
  address: { value: "", isValid: true },
  district: { value: "", isValid: true },
  password: { value: "", isValid: true },
  repeatPassword: { value: "", isValid: true },
};

const User = () => {
  const [form, setForm] = useState(initData);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: { value: e.target.value, isValid: true },
    });
  };

  const onClick = () => {
    if (form.password.value === form.repeatPassword.value) {
      axios
        .post("http://localhost:3001/api/user/upsert", {
          rut: form.rut.value,
          name: form.name.value,
          paternalLastName: form.paternalLastName.value,
          maternalLastName: form.maternalLastName.value,
          email: form.email.value,
          phone: form.phone.value,
          address: form.address.value,
          district: form.district.value,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("Las contraseñas no coinciden");
    }
  };
  return (
    <Option>
      <div className={styles.header}>
        <ul className={styles.left}>Usuario</ul>
      </div>

      <ContentCell gap="7px">
        <InputText
          label="Rut"
          type="text"
          placeholder="11.111.111-1"
          width="300px"
          onChange={handleOnChange}
          value={form.rut.value}
          name="rut"
        />

        <InputText
          label="Nombre"
          type="text"
          placeholder="Julio"
          width="300px"
          onChange={handleOnChange}
          value={form.name.value}
          name="name"
        />

        <InputText
          label="Apellido Paterno"
          type="text"
          placeholder="Rodriguez"
          width="300px"
          onChange={handleOnChange}
          value={form.paternalLastName.value}
          name="paternalLastName"
        />

        <InputText
          label="Apellido Materno"
          type="text"
          placeholder="Acevedo"
          width="300px"
          onChange={handleOnChange}
          value={form.maternalLastName.value}
          name="maternalLastName"
        />

        <InputText
          label="Dirección"
          type="text"
          placeholder="Av. Providencia 221..."
          width="300px"
          onChange={handleOnChange}
          value={form.address.value}
          name="address"
        />

        <InputText
          label="Comuna"
          type="text"
          placeholder="Providencia"
          width="300px"
          onChange={handleOnChange}
          value={form.district.value}
          name="district"
        />

        <InputText
          label="Correo electrónico"
          type="text"
          placeholder="julio@gmail.com"
          width="300px"
          onChange={handleOnChange}
          value={form.email.value}
          name="email"
        />

        <InputText
          label="Teléfono"
          type="phone"
          placeholder="+569 9934 1234"
          width="300px"
          onChange={handleOnChange}
          value={form.phone.value}
          name="phone"
        />
      </ContentCell>

      <Button label="Crear" onClick={onClick} />

      <ContentCell gap="7px">
        <InputText
          label="Contraseña"
          type="password"
          placeholder="********"
          width="300px"
          onChange={handleOnChange}
          value={form.password.value}
          name="password"
        />

        <InputText
          label="Repetir contraseña"
          type="password"
          placeholder="********"
          width="300px"
          onChange={handleOnChange}
          value={form.repeatPassword.value}
          name="repeatPassword"
        />
      </ContentCell>

      <Button label="Crear" onClick={onClick} />
    </Option>
  );
};

export default User;
