import React, { useState, useEffect } from "react";

import { ContentCell } from "@/components/layout/Content";
import Option from "@/components/layout/Option";

import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";

import { useRouter } from "next/navigation";
import { usePerson } from "@/store/hooks";

import {
  OptionBody,
  OptionHeader,
  OptionOverlay,
} from "@/components/layout/OptionHeader";

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

const Person = ({ id }: any) => {
  const {
    person,
    isLoading,
    isError,
    error,
    upsert,
    getByRut,
    getById,
    deleteById,
  } = usePerson();

  const [form, setForm] = useState(initData);
  const [buttonLabel, setButtonLabel] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "rut") {
      const rutValue = value.toUpperCase();
      getByRut(rutValue);
      if (!person?.rut) {
        setForm({
          ...form,
          [e.target.name]: { value: e.target.value, isValid: true },
        });
      }
      setForm({
        ...form,
        rut: { value: rutValue, isValid: true },
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: { value: "", isValid: true },
      });
    }
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const rut = e.target.value;
    getByRut(rut);
  };

  const router = useRouter();

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
    router.push("/register/person");
  };

  const deleteOnClick = () => {
    deleteById(id);
    router.push("/register/person");
  };

  useEffect(() => {
    getById(id);
    if (person?.id) {
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
  }, []);

  useEffect(() => {
    setForm({
      ...form,
      name: { value: "", isValid: true },
      paternalLastName: { value: "", isValid: true },
      maternalLastName: { value: "", isValid: true },
      email: { value: "", isValid: true },
      phone: { value: "", isValid: true },
      address: { value: "", isValid: true },
      district: { value: "", isValid: true },
    });
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
      <OptionOverlay>
        <OptionHeader tittle="Persona">{}</OptionHeader>
        <OptionBody>
          <ContentCell gap="7px">
            <InputText
              label="Rut"
              type="text"
              placeholder="Rut"
              width="300px"
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              value={form.rut.value}
              name="rut"
            />

            <InputText
              label="Nombre"
              type="text"
              placeholder="Nombre de la persona"
              width="300px"
              onChange={handleOnChange}
              value={form.name.value}
              name="name"
            />

            <InputText
              label="Apellido Paterno"
              type="text"
              placeholder="Apellido Paterno"
              width="300px"
              onChange={handleOnChange}
              value={form.paternalLastName.value}
              name="paternalLastName"
            />

            <InputText
              label="Apellido Materno"
              type="text"
              placeholder="Apellido Materno"
              width="300px"
              onChange={handleOnChange}
              value={form.maternalLastName.value}
              name="maternalLastName"
            />

            <InputText
              label="Dirección"
              type="text"
              placeholder="Dirección"
              width="300px"
              onChange={handleOnChange}
              value={form.address.value}
              name="address"
            />

            <InputText
              label="Comuna"
              type="text"
              placeholder="Comuna"
              width="300px"
              onChange={handleOnChange}
              value={form.district.value}
              name="district"
            />

            <InputText
              label="Correo electrónico"
              type="text"
              placeholder="ejemplo@gmail.com"
              width="300px"
              onChange={handleOnChange}
              value={form.email.value}
              name="email"
            />

            <InputText
              label="Teléfono"
              type="phone"
              placeholder="+569 ...."
              width="300px"
              onChange={handleOnChange}
              value={form.phone.value}
              name="phone"
            />
            <Button label={buttonLabel} onClick={onClick} />
            <Button label="Eliminar" onClick={deleteOnClick} />
          </ContentCell>
        </OptionBody>
      </OptionOverlay>
    </Option>
  );
};

export default Person;
