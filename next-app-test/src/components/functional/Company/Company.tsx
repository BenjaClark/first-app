import React, { useState, useEffect } from "react";

import { ContentCell } from "@/components/layout/Content";
import Option from "@/components/layout/Option";

import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";

import { useRouter } from "next/navigation";
import { useCompany } from "@/store/hooks";

import {
  OptionBody,
  OptionHeader,
  OptionOverlay,
} from "@/components/layout/OptionHeader";

import { isValidEmail, isValidPhone, isValidRut } from "@/utils/validate";
import { formatRut, unFormatRut } from "@/utils/format";

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

const Company = ({ id }: any) => {
  const {
    company,
    isLoading,
    isError,
    error,
    upsert,
    getByRut,
    getById,
    deleteById,
  } = useCompany();

  const [form, setForm] = useState(initData);
  const [buttonLabel, setButtonLabel] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "rut") {
      getByRut(formatRut(value));
      if (company.rut) {
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
      fantasyName: form.fantasyName.value,
      name: form.name.value,
      activity: form.activity.value,
      email: form.email.value,
      district: form.district.value,
      phone: form.phone.value,
      address: form.address.value,
    });
    router.push("/register/company");
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
    router.push("/register/company");
  };

  useEffect(() => {
    if (id !== "new") {
      getById(id);
    }
    if (company.id) {
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
    }
  }, []);

  useEffect(() => {
    setForm({
      ...form,
      name: { value: "", isValid: true },
      fantasyName: { value: "", isValid: true },
      activity: { value: "", isValid: true },
      email: { value: "", isValid: true },
      phone: { value: "", isValid: true },
      address: { value: "", isValid: true },
      district: { value: "", isValid: true },
    });
    if (company.id) {
      setButtonLabel("Actualizar");
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
    }
    if (!company.id) {
      setButtonLabel("Crear");
    }
  }, [company]);

  return (
    <Option>
      <OptionOverlay>
        <OptionHeader tittle="Empresa">{}</OptionHeader>
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
              label="Nombre de fantasía"
              type="text"
              placeholder="Nombre"
              width="300px"
              onChange={handleOnChange}
              isValid={form.fantasyName.isValid}
              value={form.fantasyName.value}
              name="fantasyName"
            />

            <InputText
              label="Nombre"
              type="text"
              placeholder="Nombre"
              width="300px"
              onChange={handleOnChange}
              isValid={form.name.isValid}
              value={form.name.value}
              name="name"
            />

            <InputText
              label="Actividad"
              type="text"
              placeholder="Actividad"
              width="300px"
              onChange={handleOnChange}
              isValid={form.activity.isValid}
              value={form.activity.value}
              name="activity"
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
              placeholder="+569"
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

export default Company;
