import React, { useState, useEffect } from "react";

import { ContentCell } from "@/components/layout/Content";

import InputText from "@/components/ui/InputText";
import Option from "@/components/layout/Option";
import Button from "@/components/ui/Button";

import { useProduct } from "@/store/hooks";

import {
  OptionBody,
  OptionHeader,
  OptionOverlay,
} from "@/components/layout/OptionHeader";
import { useRouter } from "next/navigation";

const initData = {
  code: { value: "", isValid: true },
  name: { value: "", isValid: true },
  price: { value: "", isValid: true },
};

const Product = ({ id }: any) => {
  const {
    product,
    isLoading,
    isError,
    error,
    upsert,
    getByCode,
    getById,
    deleteById,
  } = useProduct();

  const [form, setForm] = useState(initData);
  const [buttonLabel, setButtonLabel] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "code") {
      const codeValue = value.toUpperCase();
      getByCode(parseInt(codeValue));
      if (!product?.code)
        setForm({
          ...form,
          [e.target.name]: { value: codeValue, isValid: true },
        });
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

  const router = useRouter();

  const onClick = () => {
    upsert({
      code: form.code.value,
      name: form.name.value,
      price: form.price.value,
    });
    router.push("/register/product");
  };

  const deleteOnClick = () => {
    deleteById(id);
    router.push("/register/product");
  };

  useEffect(() => {
    getById(id);
    if (product?.id) {
      setForm({
        ...form,
        code: { value: product.code, isValid: true },
        name: { value: product.name, isValid: true },
        price: { value: product.price, isValid: true },
      });
    }
  }, []);

  useEffect(() => {
    setForm({
      ...form,
      name: { value: "", isValid: true },
      price: { value: "", isValid: true },
    });
    if (product) {
      setForm({
        ...form,
        code: { value: product.code, isValid: true },
        name: { value: product.name, isValid: true },
        price: { value: product.price, isValid: true },
      });
    }
  }, [product]);

  return (
    <Option>
      <OptionOverlay>
        <OptionHeader tittle="Producto">{}</OptionHeader>
        <OptionBody>
          <ContentCell gap="7px">
            <InputText
              label="Codigo"
              type="text"
              placeholder="Codigo"
              width="300px"
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              value={form.code.value.toString()}
              name="code"
            />

            <InputText
              label="Nombre"
              type="text"
              placeholder="Nombre del producto"
              width="300px"
              onChange={handleOnChange}
              value={form.name.value}
              name="name"
            />

            <InputText
              label="Precio"
              type="number"
              placeholder="$0"
              width="300px"
              onChange={handleOnChange}
              value={form.price.value.toString()}
              name="price"
            />
            <Button label="Crear" onClick={onClick} />
            <Button label="Eliminar" onClick={deleteOnClick} />
          </ContentCell>
        </OptionBody>
      </OptionOverlay>
    </Option>
  );
};

export default Product;
