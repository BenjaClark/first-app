import React, { useState, useEffect } from "react";
import { usePerson, useUser } from "@/store/hooks";

import { ContentCell, ContentRow } from "@/components/layout/Content";
import Option from "@/components/layout/Option";

import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";

import styles from "./User.module.scss";

import {
  OptionBody,
  OptionHeader,
  OptionOverlay,
} from "@/components/layout/OptionHeader";
import { useRouter } from "next/navigation";

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
      const rutValue = value.toUpperCase();
      getByRut(rutValue);
      if (!user?.rut) {
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
        [e.target.name]: { value: e.target.value, isValid: true },
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
    router.push("/register/user");
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
    getById(id);
    if (user?.id) {
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
  }, [user]);

  return (
    <Option>
      <OptionOverlay>
        <OptionHeader tittle="Usuario">{}</OptionHeader>
        <OptionBody>
          <ContentRow>
            <ContentRow gap="20px">
              <ContentCell gap="12px">
                <ul className={styles.ul}>Agregar Usuario</ul>
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
                  placeholder="Apellido paterno"
                  width="300px"
                  onChange={handleOnChange}
                  value={form.paternalLastName.value}
                  name="paternalLastName"
                />

                <InputText
                  label="Apellido Materno"
                  type="text"
                  placeholder="Apellido materno"
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
                  placeholder="ejemplo@ejemplo.com"
                  width="300px"
                  onChange={handleOnChange}
                  value={form.email.value}
                  name="email"
                />

                <InputText
                  label="Teléfono"
                  type="phone"
                  placeholder="+569"
                  width="300px"
                  onChange={handleOnChange}
                  value={form.phone.value}
                  name="phone"
                />

                <ContentRow>
                  <Button label="Crear" onClick={onClick} />
                  <Button label="Eliminar" onClick={deleteOnClick} />
                </ContentRow>
              </ContentCell>

              <ContentCell gap="7.5px">
                <ul className={styles.ul}>Crear Contraseña</ul>

                <InputText
                  label="Correo electrónico"
                  type="text"
                  placeholder="ejemplo@ejemplo.com"
                  width="300px"
                  onChange={handleOnChange}
                  value={form.email.value}
                  name="email"
                />

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

                <Button label="Crear Contraseña" onClick={assignOnClick} />
                <ul className={styles.ul}>Cambiar Contraseña</ul>
                <InputText
                  label="Correo electrónico"
                  type="text"
                  placeholder="ejemplo@ejemplo.com"
                  width="300px"
                  onChange={handleOnChange}
                  value={form.email.value}
                  name="email"
                />

                <InputText
                  label="Contraseña anterior"
                  type="password"
                  placeholder="********"
                  width="300px"
                  onChange={handleOnChange}
                  value={form.password.value}
                  name="password"
                />

                <InputText
                  label="Nueva contraseña"
                  type="password"
                  placeholder="********"
                  width="300px"
                  onChange={handleOnChange}
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
