import React, { useState, useEffect } from "react";

import { ContentCell } from "@/components/layout/Content";

import InputText from "@/components/ui/InputText";
import Option from "@/components/layout/Option";
import Button from "@/components/ui/Button";

import { usePerson } from "@/store/hooks";

import styles from "./Person.module.scss";

const initData = {
  rut: { value: "", isValid: true },
  name: { value: "", isValid: true },
  paternalLastName: { value: "", isValid: true },
  maternalLastName: { value: "", isValid: true },
  email: { value: "", isValid: true },
  phone: { value: "", isValid: true },
  address: { value: "", isValid: true },
  district: { value: "", isValid: true },
};

const Person = () => {
  const { person, isLoading, isError, error, upsert, getByRut } = usePerson();

  const [form, setForm] = useState(initData);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: { value: e.target.value, isValid: true },
    });
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const rut = e.target.value;
    getByRut(rut);
    console.log(getByRut(rut));
  };

  const onClick = () => {
    upsert({
      rut: form.rut.value,
      name: form.name.value,
      paternalLastName: form.paternalLastName.value,
      maternalLastName: form.maternalLastName.value,
      email: form.email.value,
      district: form.district.value,
      phone: form.phone.value,
      address: form.address.value,
    });
  };

  useEffect(() => {
    if (person) {
      setForm({
        ...form,
        rut: { value: person.rut, isValid: true },
        name: { value: person.name, isValid: true },
        paternalLastName: { value: person.paternalLastName, isValid: true },
        maternalLastName: { value: person.maternalLastName, isValid: true },
        email: { value: person.email, isValid: true },
        phone: { value: person.phone, isValid: true },
        address: { value: person.address, isValid: true },
        district: { value: person.district, isValid: true },
      });
    }
  }, [person]);

  return (
    <Option>
      <div className={styles.header}>
        <ul className={styles.left}>Persona</ul>
      </div>
      <ContentCell gap="7px">
        <InputText
          label="Rut"
          type="text"
          placeholder="11.111.111-1"
          width="300px"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
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
    </Option>
  );
};

export default Person;
