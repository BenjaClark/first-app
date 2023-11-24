import React, { useState, useEffect } from "react";

import Option from "@/components/layout/Option";
import Button from "@/components/ui/Button";

import { useRouter } from "next/navigation";
import { useProduct } from "@/store/hooks";

import styles from "./GetProduct.module.scss";

import {
  OptionBody,
  OptionHeader,
  OptionOverlay,
} from "@/components/layout/OptionHeader";

const GetProduct = () => {
  const { listProduct, getAll } = useProduct();

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/register/product/${id}`);
  };

  const newHandleClick = () => {
    router.push(`/register/product/new`);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Option>
      <OptionOverlay>
        <OptionHeader tittle="Producto">{}</OptionHeader>
        <OptionBody>
          <div className={styles.productListContainer}>
            <table className={styles.table}>
              {listProduct?.map((product: any, index: number) => (
                <tr key={index} onClick={() => handleClick(product.id)}>
                  <td>{product.id}</td>
                  <td>{product.code}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                </tr>
              ))}
            </table>
            <Button label="Nuevo" onClick={newHandleClick}></Button>
          </div>
        </OptionBody>
      </OptionOverlay>
    </Option>
  );
};

export default GetProduct;
