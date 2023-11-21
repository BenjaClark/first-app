import React, { useState, useEffect } from "react";

import Option from "@/components/layout/Option";
import { useCustomer } from "@/store/hooks";

import styles from "./GetCustomer.module.scss";

const GetCustomer = () => {
  const { listCustomer, getAll } = useCustomer();

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Option>
      <div className={styles.customerListContainer}>
        <h2>Listado de Customer</h2>
        <ul className={styles.userList}>
          {listCustomer?.map((customer: any, index: number) => (
            <li className={styles.li} key={customer.id}>
              <div className={styles.field}>
                <span>ID:</span> {customer.id}
              </div>
              <div className={styles.field}>
                <span>tipo:</span> {customer.type}
              </div>
              <div className={styles.field}>
                <span>RUT:</span> {customer.rut}
              </div>
              <div className={styles.field}>
                <span>Nombre:</span> {customer.name}
              </div>
              <div className={styles.field}>
                <span>Dirección:</span> {customer.address}
              </div>
              <div className={styles.field}>
                <span>Comuna:</span> {customer.district}
              </div>
              <div className={styles.field}>
                <span>Correo electrónico:</span> {customer.email}
              </div>
              <div className={styles.field}>
                <span>Teléfono:</span> {customer.phone}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Option>
  );
};

export default GetCustomer;
