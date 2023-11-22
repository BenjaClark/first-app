import React, { useState, useEffect } from "react";

import Option from "@/components/layout/Option";
import { useProduct } from "@/store/hooks";

import styles from "./GetProduct.module.scss";
import { useRouter } from "next/navigation";

const GetProduct = () => {
  const { listProduct, getAll } = useProduct();

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/register/person/${id}`);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Option>
      <div className={styles.productListContainer}>
        <h2>Listado de Productos</h2>

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
      </div>
    </Option>
  );
};

export default GetProduct;
