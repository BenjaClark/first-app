import React, { useState, useEffect } from "react";

import { ContentCell } from "@/components/layout/Content";

import InputText from "@/components/ui/InputText";
import Option from "@/components/layout/Option";
import Button from "@/components/ui/Button";

import { useProduct } from "@/store/hooks";

import styles from "./Product.module.scss";

const initData = {
  code: { value: "", isValid: true },
  name: { value: "", isValid: true },
  price: { value: "", isValid: true },
};

const Product = () => {
  const { product, isLoading, isError, error, upsert, getByCode } =
    useProduct();

  const [form, setForm] = useState(initData);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "code") {
      const codeValue = value.toUpperCase();
      setForm({
        ...form,
        code: { value: codeValue, isValid: true },
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: { value: e.target.value, isValid: true },
      });
    }
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const code = e.target.value;
    getByCode(parseInt(code));
  };

  const onClick = () => {
    upsert({
      code: form.code.value,
      name: form.name.value,
      price: form.price.value,
    });
  };

  useEffect(() => {
    if (product) {
      setForm({
        ...form,
        code: { value: product.code, isValid: true },
        name: { value: product.name, isValid: true },
        price: { value: product.price, isValid: true },
      });
    } else if (!product) {
      setForm({
        ...form,
        name: { value: "", isValid: true },
        price: { value: "", isValid: true },
      });
    }
  }, [product]);

  return (
    <Option>
      <div className={styles.header}>
        <ul className={styles.left}>Producto</ul>
      </div>
      <ContentCell gap="7px">
        <InputText
          label="Codigo"
          type="text"
          placeholder="111"
          width="300px"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          value={form.code.value.toString()}
          name="code"
        />

        <InputText
          label="Nombre"
          type="text"
          placeholder="Pastel de Limón"
          width="300px"
          onChange={handleOnChange}
          value={form.name.value}
          name="name"
        />

        <InputText
          label="Precio"
          type="number"
          placeholder="$10.000"
          width="300px"
          onChange={handleOnChange}
          value={form.price.value.toString()}
          name="price"
        />
      </ContentCell>

      <Button label="Crear" onClick={onClick} />
    </Option>
  );
};

export default Product;
