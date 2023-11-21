import React, { useState, useEffect } from "react";

import Option from "@/components/layout/Option";
import { useProduct } from "@/store/hooks";

import styles from "./GetProduct.module.scss";

const GetProduct = () => {
  const { listProduct, getAll } = useProduct();

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Option>
      <div className={styles.productListContainer}>
        <h2>Listado de Productos</h2>
        <ul className={styles.productList}>
          {listProduct?.map((product: any, index: number) => (
            <li className={styles.li} key={product.id}>
              <div className={styles.field}>
                <span>ID:</span> {product.id}
              </div>
              <div className={styles.field}>
                <span>Codigo:</span> {product.code}
              </div>
              <div className={styles.field}>
                <span>Nombre:</span> {product.name}
              </div>
              <div className={styles.field}>
                <span>Precio:</span> {product.price}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Option>
  );
};

export default GetProduct;
