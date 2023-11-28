import React, { useState, useEffect } from "react";

import { ContentCell, ContentRow } from "@/components/layout/Content";
import Option from "@/components/layout/Option";

import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";

import { useRouter } from "next/navigation";
import { useUser } from "@/store/hooks";

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
  password: { value: "", isValid: true },
  repeatPassword: { value: "", isValid: true },
  newPassword: { value: "", isValid: true },
};

const User = ({ id }: any) => {
  const {
    user,
    isLoading,
    isError,
    error,
    getById,
    getByRut,
    getByLogin,
    getAll,
    deleteById,
    upsert,
    assignPassword,
    validate,
    updatePassword,
  } = useUser();

  const [form, setForm] = useState(initData);
  const [buttonLabel, setButtonLabel] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "rut") {
      getByRut(formatRut(value));
      if (user.rut) {
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
    router.push("/register/user");
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
    router.push("/register/user");
  };

  const assignOnClick = () => {
    assignPassword(form.email.value, form.password.value);
  };

  const changePasswordOnClick = () => {
    updatePassword(
      form.email.value,
      form.password.value,
      form.newPassword.value
    );
  };

  useEffect(() => {
    if (id !== "new") {
      getById(id);
    }
    if (user.id) {
      setForm({
        ...form,
        rut: { value: user.rut, isValid: true },
        name: { value: user.name, isValid: true },
        paternalLastName: { value: user.paternalLastName, isValid: true },
        maternalLastName: { value: user.maternalLastName, isValid: true },
        email: { value: user.email, isValid: true },
        phone: { value: user.phone, isValid: true },
        address: { value: user.address, isValid: true },
        district: { value: user.district, isValid: true },
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
      password: { value: "", isValid: true },
      repeatPassword: { value: "", isValid: true },
      newPassword: { value: "", isValid: true },
    });
    if (user) {
      setButtonLabel("Actualizar");
      setForm({
        ...form,
        rut: { value: user.rut, isValid: true },
        name: { value: user.name, isValid: true },
        paternalLastName: { value: user.paternalLastName, isValid: true },
        maternalLastName: { value: user.maternalLastName, isValid: true },
        email: { value: user.email, isValid: true },
        phone: { value: user.phone, isValid: true },
        address: { value: user.address, isValid: true },
        district: { value: user.district, isValid: true },
      });
    }
    if (!user.id) {
      setButtonLabel("Crear");
    }
  }, [user]);

  return (
    <Option>
      <OptionOverlay>
        <OptionHeader tittle="Usuario">{}</OptionHeader>
        <OptionBody>
          <ContentRow>
            <ContentRow gap="20px">
              <ContentCell gap="12px">
                <ul>Cambiar Contraseña</ul>
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
                  placeholder="Apellido paterno"
                  width="300px"
                  onChange={handleOnChange}
                  isValid={form.paternalLastName.isValid}
                  value={form.paternalLastName.value}
                  name="paternalLastName"
                />

                <InputText
                  label="Apellido Materno"
                  type="text"
                  placeholder="Apellido materno"
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
                  placeholder="+569"
                  width="300px"
                  onChange={handleOnChange}
                  isValid={form.phone.isValid}
                  value={form.phone.value}
                  name="phone"
                />

                <ContentRow>
                  <Button label={buttonLabel} onClick={onClick} />
                  <Button label="Eliminar" onClick={deleteOnClick} />
                </ContentRow>
              </ContentCell>

              <ContentCell gap="7.5px">
                <ul>Crear Contraseña</ul>

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
                  label="Contraseña"
                  type="password"
                  placeholder="********"
                  width="300px"
                  onChange={handleOnChange}
                  isValid={form.password.isValid}
                  value={form.password.value}
                  name="password"
                />

                <InputText
                  label="Repetir contraseña"
                  type="password"
                  placeholder="********"
                  width="300px"
                  onChange={handleOnChange}
                  isValid={form.repeatPassword.isValid}
                  value={form.repeatPassword.value}
                  name="repeatPassword"
                />

                <Button label="Crear Contraseña" onClick={assignOnClick} />
                <ul>Cambiar Contraseña</ul>
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
                  label="Contraseña anterior"
                  type="password"
                  placeholder="********"
                  width="300px"
                  onChange={handleOnChange}
                  isValid={form.password.isValid}
                  value={form.password.value}
                  name="password"
                />

                <InputText
                  label="Nueva contraseña"
                  type="password"
                  placeholder="********"
                  width="300px"
                  onChange={handleOnChange}
                  isValid={form.newPassword.isValid}
                  value={form.newPassword.value}
                  name="newPassword"
                />
                <Button
                  label="Cambiar Contraseña"
                  onClick={changePasswordOnClick}
                />
              </ContentCell>
            </ContentRow>
          </ContentRow>
        </OptionBody>
      </OptionOverlay>
    </Option>
  );
};

export default User;
