import React, { useState, useEffect } from "react";

import { ContentCell } from "@/components/layout/Content";

import InputText from "@/components/ui/InputText";
import Option from "@/components/layout/Option";
import Button from "@/components/ui/Button";

import { useCustomer } from "@/store/hooks";

import styles from "./Customer.module.scss";
import InputSelect from "@/components/ui/InputSelect";

const initData = {
  type: { value: "", isValid: true },
  rut: { value: "", isValid: true },
  name: { value: "", isValid: true },
  fantasyName: { value: "", isValid: true },
  paternalLastName: { value: "", isValid: true },
  maternalLastName: { value: "", isValid: true },
  activity: { value: "", isValid: true },
  address: { value: "", isValid: true },
  district: { value: "", isValid: true },
  email: { value: "", isValid: true },
  phone: { value: "", isValid: true },
};

const dataSelect = [
  { value: "", text: "Seleccionar" },
  { value: "P", text: "Persona" },
  { value: "C", text: "Compañía" },
];

const Customer = () => {
  const { customer, isLoading, isError, error, upsert, getByRut } =
    useCustomer();

  const [form, setForm] = useState(initData);
  const [selectedType, setSelectedType] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "rut") {
      const rutValue = value.toUpperCase();
      setForm({
        ...form,
        rut: { value: rutValue, isValid: true },
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: { value: e.target.value, isValid: true },
      });
    }
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const rut = e.target.value;
    getByRut(rut);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedType(selectedValue);
  };

  const onClick = () => {
    upsert({
      type: selectedType,
      rut: form.rut.value,
      fantasyName: form.fantasyName.value,
      name: form.name.value,
      paternalLastName: form.paternalLastName.value,
      maternalLastName: form.maternalLastName.value,
      activity: form.activity.value,
      email: form.email.value,
      district: form.district.value,
      phone: form.phone.value,
      address: form.address.value,
    });
  };

  useEffect(() => {
    if (customer) {
      setForm({
        ...form,
        type: { value: customer.type, isValid: true },
        rut: { value: customer.rut, isValid: true },
        fantasyName: { value: customer.fantasyName, isValid: true },
        name: { value: customer.name, isValid: true },
        paternalLastName: { value: customer.paternalLastName, isValid: true },
        maternalLastName: { value: customer.maternalLastName, isValid: true },
        activity: { value: customer.activity, isValid: true },
        email: { value: customer.email, isValid: true },
        phone: { value: customer.phone, isValid: true },
        address: { value: customer.address, isValid: true },
        district: { value: customer.district, isValid: true },
      });
    } else {
      setForm({
        ...form,
        fantasyName: { value: "", isValid: true },
        name: { value: "", isValid: true },
        paternalLastName: { value: "", isValid: true },
        maternalLastName: { value: "", isValid: true },
        activity: { value: "", isValid: true },
        email: { value: "", isValid: true },
        phone: { value: "", isValid: true },
        address: { value: "", isValid: true },
        district: { value: "", isValid: true },
      });
    }
  }, [customer]);

  return (
    <Option>
      <div className={styles.header}>
        <ul className={styles.left}>Customer</ul>
      </div>
      <ContentCell gap="7px">
        <InputSelect
          label="Tipo"
          width="300px"
          onChange={handleTypeChange}
          value={selectedType || ""}
          name="type"
          data={dataSelect}
        />

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
          placeholder="Nombre"
          width="300px"
          onChange={handleOnChange}
          value={form.name.value}
          name="name"
        />

        {selectedType === "C" && (
          <>
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
              label="Actividad"
              type="text"
              placeholder="Venta de..."
              width="300px"
              onChange={handleOnChange}
              value={form.activity.value}
              name="activity"
            />
          </>
        )}
        {selectedType === "P" && (
          <>
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
          </>
        )}
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

export default Customer;
