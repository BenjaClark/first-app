import * as React from "react";

import { ContentCell, ContentRow } from "@/components/layout/Content";
import Header from "@/components/ui/Header";
import InputText from "@/components/ui/InputText";
import InputSelect from "@/components/ui/InputSelect";

import Option from "@/components/layout/Option";
import OptionHeader from "@/components/layout/OptionHeader";
const Order = () => {
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
                />
                <InputText
                  label="Nombre"
                  type="text"
                  placeholder="Julio Rodriguez Acevedo"
                  width="300px"
                />
              </ContentRow>

              <ContentRow gap="5px">
                <InputText
                  label="Correo electrónico"
                  type="text"
                  placeholder="julio@gmail.com"
                  width="300px"
                />
                <InputText
                  label="Telefono"
                  type="phone"
                  placeholder="+569 9934 1234"
                  width="140px"
                />
              </ContentRow>

              <ContentCell gap="5px">
                <ContentRow gap="5px" marginTop="15px">
                  <InputSelect label="Forma" width="220px" />
                  <InputSelect label="Tamaño" width="220px" />
                </ContentRow>

                <ContentRow gap="5px">
                  <InputSelect label="Masa" width="220px" />
                  <InputSelect label="Sabor" width="220px" />
                </ContentRow>

                <ContentRow gap="5px">
                  <InputSelect label="Crema" width="220px" />
                  <InputSelect label="Relleno" width="220px" />
                </ContentRow>

                <ContentRow gap="5px">
                  <InputSelect label="Extra" width="220px" />
                </ContentRow>
              </ContentCell>

              <ContentCell gap="5px">
                <ContentRow gap="5px" marginTop="15px">
                  <InputText
                    label="Mensaje"
                    type="text"
                    placeholder="Feliz Cumpleaños"
                    width="445px"
                  />
                </ContentRow>

                <ContentRow gap="5px">
                  <InputText
                    label="Adicional"
                    type="text"
                    placeholder="Poco Manjar"
                    width="445px"
                  />
                </ContentRow>
              </ContentCell>
            </ContentCell>
          </ContentCell>

          <ContentCell gap="5px">
            <ContentRow gap="5px">
              <InputSelect label="Sucursal" width="266px" />
            </ContentRow>

            <ContentRow gap="5px">
              <InputText
                label="Fecha"
                type="date"
                placeholder="Poco Manjar"
                width="160px"
              />
              <InputText
                label="Hora"
                type="time"
                placeholder="Poco Manjar"
                width="100px"
              />
            </ContentRow>

            <ContentCell gap="5px">
              <ContentRow gap="5px" marginTop="15px">
                <InputText
                  label="Precio"
                  type="text"
                  placeholder="$12.500"
                  width="130px"
                />
                <InputText
                  label="Abono"
                  type="text"
                  placeholder="$10.000"
                  width="131px"
                />
              </ContentRow>

              <ContentRow gap="5px">
                <InputSelect label="Tipo de pago" width="266px" />
              </ContentRow>

              <ContentRow gap="5px">
                <InputText
                  label="Estado del pago"
                  type="text"
                  placeholder="Pendiente"
                  width="266px"
                />
              </ContentRow>

              <ContentRow gap="5px">
                <InputText
                  label="Estado del pedido"
                  type="text"
                  placeholder="En cámara"
                  width="266px"
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
                />
              </ContentRow>

              <ContentRow gap="5px">
                <InputText
                  label="Fecha"
                  type="text"
                  placeholder="12/02/2022"
                  width="160px"
                />
                <InputText
                  label="Hora"
                  type="text"
                  placeholder="15:34"
                  width="100px"
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
