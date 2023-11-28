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

import { isValidEmail, isValidPhone, isValidRut } from "@/utils/validate";
import { formatRut, unFormatRut } from "@/utils/format";

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
      getByRut(formatRut(value));
      if (person.rut) {
        setForm({
          ...form,
          [e.target.name]: { value: e.target.value, isValid: true },
        });
      }
      setForm({
        ...form,
        rut: {
          value: e.target.value.trim(),
          isValid: isValidRut(e.target.value.trim()),
        },
      });
    }
    if (name === "email") {
      setForm({
        ...form,
        email: {
          value: e.target.value,
          isValid: isValidEmail(e.target.value),
        },
      });
    }
    if (name === "phone") {
      setForm({
        ...form,
        phone: {
          value: e.target.value,
          isValid: isValidPhone(e.target.value),
        },
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: {
          value: e.target.value,
          isValid: e.target.value !== "" ? true : false,
        },
      });
    }
  };

  const handleOnBlurRut = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const rut = e.target.value;
    getByRut(formatRut(form.rut.value.trim()));
    setForm({
      ...form,
      rut: {
        value: formatRut(form.rut.value.trim()),
        isValid: isValidRut(unFormatRut(e.target.value.trim())),
      },
    });
  };

  const handleOnBlurEmail = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      email: {
        value: form.email.value,
        isValid: isValidEmail(e.target.value),
      },
    });
  };

  const router = useRouter();

  const onClick = () => {
    upsert({
      id: "",
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

  const handleOnFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      rut: {
        value: unFormatRut(form.rut.value.trim()),
        isValid: isValidRut(unFormatRut(e.target.value.trim())),
      },
    });
  };

  const deleteOnClick = () => {
    deleteById(id);
    router.push("/register/person");
  };

  useEffect(() => {
    if (id !== "new") {
      getById(id);
    }
    if (person.id) {
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
    if (person.id) {
      setButtonLabel("Actualizar");
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

    if (!person.id) {
      setButtonLabel("Crear");
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
              onBlur={handleOnBlurRut}
              onFocus={handleOnFocus}
              isValid={form.rut.isValid}
              value={form.rut.value}
              name="rut"
            />

            <InputText
              label="Nombre"
              type="text"
              placeholder="Nombre de la persona"
              width="300px"
              onChange={handleOnChange}
              isValid={form.name.isValid}
              value={form.name.value}
              name="name"
            />

            <InputText
              label="Apellido Paterno"
              type="text"
              placeholder="Apellido Paterno"
              width="300px"
              onChange={handleOnChange}
              isValid={form.paternalLastName.isValid}
              value={form.paternalLastName.value}
              name="paternalLastName"
            />

            <InputText
              label="Apellido Materno"
              type="text"
              placeholder="Apellido Materno"
              width="300px"
              onChange={handleOnChange}
              isValid={form.maternalLastName.isValid}
              value={form.maternalLastName.value}
              name="maternalLastName"
            />

            <InputText
              label="Dirección"
              type="text"
              placeholder="Dirección"
              width="300px"
              onChange={handleOnChange}
              isValid={form.address.isValid}
              value={form.address.value}
              name="address"
            />

            <InputText
              label="Comuna"
              type="text"
              placeholder="Comuna"
              width="300px"
              onChange={handleOnChange}
              isValid={form.district.isValid}
              value={form.district.value}
              name="district"
            />

            <InputText
              label="Correo electrónico"
              type="text"
              placeholder="ejemplo@ejemplo.com"
              width="300px"
              onChange={handleOnChange}
              onBlur={handleOnBlurEmail}
              isValid={form.email.isValid}
              value={form.email.value}
              name="email"
            />

            <InputText
              label="Teléfono"
              type="phone"
              placeholder="+569 ...."
              width="300px"
              onChange={handleOnChange}
              isValid={form.phone.isValid}
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
