import React, { useState, useEffect } from "react";
import { useCustomer } from "@/store/hooks";
import { useRouter } from "next/navigation";

import { ContentCell } from "@/components/layout/Content";
import Option from "@/components/layout/Option";

import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import InputSelect from "@/components/ui/InputSelect";

import {
  OptionBody,
  OptionHeader,
  OptionOverlay,
} from "@/components/layout/OptionHeader";

import { isValidEmail, isValidPhone, isValidRut } from "@/utils/validate";
import { formatRut, unFormatRut } from "@/utils/format";

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

const Customer = ({ id }: any) => {
  const {
    customer,
    isLoading,
    isError,
    error,
    upsert,
    getByRut,
    getById,
    deleteById,
  } = useCustomer();

  const [form, setForm] = useState(initData);
  const [selectedType, setSelectedType] = useState<string>("");
  const [buttonLabel, setButtonLabel] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "rut") {
      getByRut(formatRut(value));
      if (customer.rut) {
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
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedType(selectedValue);
  };

  const router = useRouter();

  const onClick = () => {
    upsert({
      id: "",
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
    router.push("/register/customer");
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
    router.push("/register/customer");
  };

  useEffect(() => {
    if (id !== "new") {
      getById(id);
    }
    if (customer.id) {
      setForm({
        ...form,
        rut: { value: customer.rut, isValid: true },
        name: { value: customer.name, isValid: true },
        fantasyName: { value: customer.fantasyName, isValid: true },
        activity: { value: customer.activity, isValid: true },
        email: { value: customer.email, isValid: true },
        phone: { value: customer.phone, isValid: true },
        address: { value: customer.address, isValid: true },
        district: { value: customer.district, isValid: true },
      });
    }
  }, []);

  useEffect(() => {
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
    if (customer) {
      setButtonLabel("Actualizar");
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
    }
    if (!customer.id) {
      setButtonLabel("Crear");
    }
  }, [customer]);

  return (
    <Option>
      <OptionOverlay>
        <OptionHeader tittle="Cliente">{}</OptionHeader>
        <OptionBody>
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
              placeholder="Nombre"
              width="300px"
              onChange={handleOnChange}
              isValid={form.name.isValid}
              value={form.name.value}
              name="name"
            />

            {selectedType === "C" && (
              <>
                <InputText
                  label="Nombre de fantasía"
                  type="text"
                  placeholder="Nombre de fantasía"
                  width="300px"
                  onChange={handleOnChange}
                  isValid={form.fantasyName.isValid}
                  value={form.fantasyName.value}
                  name="fantasyName"
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
              </>
            )}
            {selectedType === "P" && (
              <>
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
              </>
            )}
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
              placeholder="+569..."
              width="300px"
              onChange={handleOnChange}
              isValid={form.phone.isValid}
              value={form.phone.value}
              name="phone"
            />
            <Button label="Crear" onClick={onClick} />
            <Button label="Eliminar" onClick={deleteOnClick} />
          </ContentCell>
        </OptionBody>
      </OptionOverlay>
    </Option>
  );
};

export default Customer;
