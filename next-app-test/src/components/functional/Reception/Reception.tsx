"use client";

import React, { useContext, useState } from "react";

import { ContentCell, ContentRow } from "@/components/layout/Content";

import InputSelect from "@/components/ui/InputSelect";

import Option from "@/components/layout/Option";
import OptionHeader from "@/components/layout/OptionHeader";

import { StoreContext } from "@/context/StoreContext";
import { ShapeContext } from "@/context/ShapeContext";
import Store from "@/components/ui/Store";
import Shape from "@/components/ui/Shape";

const initData = {
  shape: { value: "", isValid: true },
  sucursal: { value: "", isValid: true },
};

const Reception = () => {
  const [form, setForm] = useState(initData);
  const { color, setColor, store, setStore, dataSelect } =
    useContext(StoreContext);

  const { colorShape, setColorShape, shape, setShape, dataSelectShape } =
    useContext(ShapeContext);

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
      <OptionHeader>
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
      </OptionHeader>
    </Option>
  );
};

export default Reception;
