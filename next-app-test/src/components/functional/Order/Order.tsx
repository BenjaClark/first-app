import React, { useState, useEffect, useContext } from "react";

import { ContentCell, ContentRow } from "@/components/layout/Content";
import InputText from "@/components/ui/InputText";
import InputSelect from "@/components/ui/InputSelect";

import Option from "@/components/layout/Option";
import OptionHeader from "@/components/layout/OptionHeader";
import InputDate from "@/components/ui/InputDate";
import { StoreContext } from "@/context/StoreContext";

const initData = {
  rut: { value: "", isValid: true },
  name: { value: "", isValid: true },
  email: { value: "", isValid: true },
  phone: { value: "", isValid: true },

  shape: { value: "", isValid: true },
  size: { value: "", isValid: true },
  dough: { value: "", isValid: true },
  flavor: { value: "", isValid: true },
  cream: { value: "", isValid: true },
  fill: { value: "", isValid: true },
  extra: { value: "", isValid: true },

  message: { value: "", isValid: true },
  aditional: { value: "", isValid: true },

  sucursal: { value: "", isValid: true },
  fecha: { value: "", isValid: true },
  hour: { value: "", isValid: true },

  price: { value: "", isValid: true },
  deposit: { value: "", isValid: true },
  payment: { value: "", isValid: true },
  payState: { value: "", isValid: true },
  orderState: { value: "", isValid: true },

  user: { value: "", isValid: true },
  date: { value: "", isValid: true },
};

const Order = () => {
  const [form, setForm] = useState(initData);
  const { store, setColor, setStore, dataSelect } = useContext(StoreContext);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: { value: e.target.value, isValid: true },
    });
    setStore(e.target.value);
    const color = dataSelect.filter(
      (item: any) => item.value === e.target.value
    );
    console.log(color[0]);
    setColor(color[0].color);
  };

  return (
    <Option>
      <OptionHeader>
        <ContentRow gap="20px">
          <ContentCell gap="20px">
            <ContentCell gap="5px">
              <ContentRow gap="5px">
                <InputText
                  label="Rut"
                  type="text"
                  placeholder="11.111.111-1"
                  width="140px"
                  onChange={handleOnChange}
                  value={form.rut.value}
                  name="rut"
                />
                <InputText
                  label="Nombre"
                  type="text"
                  placeholder="Julio Rodriguez Acevedo"
                  width="300px"
                  onChange={handleOnChange}
                  value={form.name.value}
                  name="name"
                />
              </ContentRow>

              <ContentRow gap="5px">
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
                  label="Telefono"
                  type="phone"
                  placeholder="+569 9934 1234"
                  width="140px"
                  onChange={handleOnChange}
                  value={form.phone.value}
                  name="phone"
                />
              </ContentRow>

              <ContentCell gap="5px">
                <ContentRow gap="5px" marginTop="15px">
                  <InputSelect
                    label="Forma"
                    width="220px"
                    value={form.shape.value}
                    onChange={handleOnChange}
                    name="shape"
                    data={dataSelect}
                  />
                  <InputSelect
                    label="Tamaño"
                    width="220px"
                    value={form.size.value}
                    onChange={handleOnChange}
                    name="size"
                    data={dataSelect}
                  />
                </ContentRow>

                <ContentRow gap="5px">
                  <InputSelect
                    label="Masa"
                    width="220px"
                    value={form.dough.value}
                    onChange={handleOnChange}
                    name="dough"
                    data={dataSelect}
                  />
                  <InputSelect
                    label="Sabor"
                    width="220px"
                    value={form.flavor.value}
                    onChange={handleOnChange}
                    name="flavor"
                    data={dataSelect}
                  />
                </ContentRow>

                <ContentRow gap="5px">
                  <InputSelect
                    label="Crema"
                    width="220px"
                    value={form.cream.value}
                    onChange={handleOnChange}
                    name="cream"
                    data={dataSelect}
                  />
                  <InputSelect
                    label="Relleno"
                    width="220px"
                    value={form.fill.value}
                    onChange={handleOnChange}
                    name="fill"
                    data={dataSelect}
                  />
                </ContentRow>

                <ContentRow gap="5px">
                  <InputSelect
                    label="Extra"
                    width="220px"
                    value={form.extra.value}
                    onChange={handleOnChange}
                    name="extra"
                    data={dataSelect}
                  />
                </ContentRow>
              </ContentCell>

              <ContentCell gap="5px">
                <ContentRow gap="5px" marginTop="15px">
                  <InputText
                    label="Mensaje"
                    type="text"
                    placeholder="Feliz Cumpleaños"
                    width="445px"
                    onChange={handleOnChange}
                    value={form.message.value}
                    name="message"
                  />
                </ContentRow>

                <ContentRow gap="5px">
                  <InputText
                    label="Adicional"
                    type="text"
                    placeholder="Poco Manjar"
                    width="445px"
                    onChange={handleOnChange}
                    value={form.aditional.value}
                    name="aditional"
                  />
                </ContentRow>
              </ContentCell>
            </ContentCell>
          </ContentCell>

          <ContentCell gap="5px">
            <ContentRow gap="5px">
              <InputSelect
                label="Sucursal"
                width="266px"
                value={store}
                onChange={handleOnChange}
                name="sucursal"
                data={dataSelect}
              />
            </ContentRow>

            <ContentRow gap="6px">
              <InputDate
                type="date"
                label="Fecha"
                placeholder="01-02-2023"
                width="160px"
                value={form.date.value}
                onChange={handleOnChange}
                name="date"
              />
              <InputText
                label="Hora"
                type="time"
                placeholder="Poco Manjar"
                width="100px"
                onChange={handleOnChange}
                value={form.hour.value}
                name="hour"
              />
            </ContentRow>

            <ContentCell gap="5px">
              <ContentRow gap="5px" marginTop="15px">
                <InputText
                  label="Precio"
                  type="text"
                  placeholder="$12.500"
                  width="130px"
                  onChange={handleOnChange}
                  value={form.price.value}
                  name="price"
                />
                <InputText
                  label="Abono"
                  type="text"
                  placeholder="$10.000"
                  width="131px"
                  onChange={handleOnChange}
                  value={form.deposit.value}
                  name="deposit"
                />
              </ContentRow>

              <ContentRow gap="5px">
                <InputSelect
                  label="Tipo de pago"
                  width="266px"
                  value={form.payment.value}
                  onChange={handleOnChange}
                  name="payment"
                  data={dataSelect}
                />
              </ContentRow>

              <ContentRow gap="5px">
                <InputText
                  label="Estado del pago"
                  type="text"
                  placeholder="Pendiente"
                  width="266px"
                  onChange={handleOnChange}
                  value={form.payState.value}
                  name="payState"
                />
              </ContentRow>

              <ContentRow gap="5px">
                <InputText
                  label="Estado del pedido"
                  type="text"
                  placeholder="En cámara"
                  width="266px"
                  onChange={handleOnChange}
                  value={form.orderState.value}
                  name="orderState"
                />
              </ContentRow>
            </ContentCell>

            <ContentCell gap="5px">
              <ContentRow gap="5px" marginTop="15px">
                <InputText
                  label="Usuario"
                  type="text"
                  placeholder="Juan Pérez"
                  width="266px"
                  onChange={handleOnChange}
                  value={form.user.value}
                  name="user"
                />
              </ContentRow>

              <ContentRow gap="6px">
                <InputText
                  label="Fecha"
                  type="text"
                  placeholder="12/02/2022"
                  width="160px"
                  onChange={handleOnChange}
                  value={form.date.value}
                  name="date"
                />
                <InputText
                  label="Hora"
                  type="text"
                  placeholder="15:34"
                  width="100px"
                  onChange={handleOnChange}
                  value={form.hour.value}
                  name="hour"
                />
              </ContentRow>
            </ContentCell>
          </ContentCell>
        </ContentRow>
      </OptionHeader>
    </Option>
  );
};

export default Order;
