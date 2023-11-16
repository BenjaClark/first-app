import React, { useState, useEffect } from "react";

import { ContentCell } from "@/components/layout/Content";

import InputText from "@/components/ui/InputText";
import Option from "@/components/layout/Option";
import Button from "@/components/ui/Button";

import { useCompany } from "@/store/hooks";

import styles from "./Company.module.scss";

const initData = {
  rut: { value: "", isValid: true },
  fantasyName: { value: "", isValid: true },
  name: { value: "", isValid: true },
  activity: { value: "", isValid: true },
  email: { value: "", isValid: true },
  phone: { value: "", isValid: true },
  address: { value: "", isValid: true },
  district: { value: "", isValid: true },
};

const Company = () => {
  const { company, isLoading, isError, error, upsert, getByRut } = useCompany();

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
  };

  const onClick = () => {
    upsert({
      rut: form.rut.value,
      fantasyName: form.fantasyName.value,
      name: form.name.value,
      activity: form.activity.value,
      email: form.email.value,
      district: form.district.value,
      phone: form.phone.value,
      address: form.address.value,
    });
  };

  useEffect(() => {
    if (company) {
      setForm({
        ...form,
        rut: { value: company.rut, isValid: true },
        name: { value: company.name, isValid: true },
        fantasyName: { value: company.fantasyName, isValid: true },
        activity: { value: company.activity, isValid: true },
        email: { value: company.email, isValid: true },
        phone: { value: company.phone, isValid: true },
        address: { value: company.address, isValid: true },
        district: { value: company.district, isValid: true },
      });
    } else if (!company) {
      setForm({
        ...form,
        fantasyName: { value: "", isValid: true },
        name: { value: "", isValid: true },
        activity: { value: "", isValid: true },
        email: { value: "", isValid: true },
        phone: { value: "", isValid: true },
        address: { value: "", isValid: true },
        district: { value: "", isValid: true },
      });
    }
  }, [company]);

  return (
    <Option>
      <div className={styles.header}>
        <ul className={styles.left}>Empresa</ul>
      </div>
      <ContentCell gap="7px">
        <InputText
          label="Rut"
          type="text"
          placeholder="77.777.777-7"
          width="300px"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          value={form.rut.value}
          name="rut"
        />

        <InputText
          label="Nombre de fantasía"
          type="text"
          placeholder="El Parrón - Norte 2"
          width="300px"
          onChange={handleOnChange}
          value={form.fantasyName.value}
          name="fantasyName"
        />

        <InputText
          label="Nombre"
          type="text"
          placeholder="El Parrón"
          width="300px"
          onChange={handleOnChange}
          value={form.name.value}
          name="name"
        />

        <InputText
          label="Actividad"
          type="text"
          placeholder="Venta de..."
          width="300px"
          onChange={handleOnChange}
          value={form.activity.value}
          name="activity"
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
          placeholder="elparron@gmail.com"
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

export default Company;
