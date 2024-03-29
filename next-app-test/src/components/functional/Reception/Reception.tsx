"use client";
import React, { useContext, useState } from "react";

import { ContentCell, ContentRow } from "@/components/layout/Content";
import Option from "@/components/layout/Option";

import InputSelect from "@/components/ui/InputSelect";
import Store from "@/components/ui/Store";
import Shape from "@/components/ui/Shape";

import { useStore } from "@/store/hooks/useStore";
import { useShape } from "@/store/hooks/useShape";

const initData = {
  shape: { value: "", isValid: true },
  sucursal: { value: "", isValid: true },
};

const dataSelect = [
  { value: "opcion1", text: "Sucursal 1", color: "red" },
  { value: "opcion2", text: "Sucursal 2", color: "green" },
  { value: "opcion3", text: "Sucursal 3", color: "blue" },
  { value: "opcion4", text: "Sucursal 4", color: "orange" },
];

const dataSelectShape = [
  { value: "opcion1", text: "Cuadrada", color: "purple" },
  { value: "opcion2", text: "Redonda", color: "white" },
  { value: "opcion3", text: "Rectangular", color: "cyan" },
  { value: "opcion4", text: "Triangular", color: "gray" },
];

const Reception = ({ id }: any) => {
  const [form, setForm] = useState(initData);

  const { color, setColor, store, setStore } = useStore();

  const { shape, setShape, colorShape, setColorShape } = useShape();

  const handleOnChangeShape = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: { value: e.target.value, isValid: true },
    });

    setShape(e.target.value);
    const colorShape = dataSelectShape.filter(
      (item: any) => item.value === e.target.value
    );

    console.log(colorShape[0]);
    setColorShape(colorShape[0].color);
  };

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
      <ContentCell gap="50px">
        <ContentRow gap="30px">
          <InputSelect
            label="Forma"
            width="300px"
            value={form.shape.value}
            onChange={handleOnChangeShape}
            name="shape"
            data={dataSelectShape}
          />
          <Shape bgColor={colorShape} label={shape} />
        </ContentRow>

        <ContentRow gap="30px">
          <InputSelect
            label="Sucursal"
            width="300px"
            value={form.sucursal.value}
            onChange={handleOnChange}
            name="sucursal"
            data={dataSelect}
          />
          <Store bgColor={color} label={store} />
        </ContentRow>
      </ContentCell>
    </Option>
  );
};

export default Reception;
