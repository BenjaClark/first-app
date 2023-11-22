import React, { useState, useEffect } from "react";

import Option from "@/components/layout/Option";
import { useCustomer } from "@/store/hooks";

import styles from "./GetCustomer.module.scss";
import { useRouter } from "next/navigation";
import {
  OptionBody,
  OptionHeader,
  OptionOverlay,
} from "@/components/layout/OptionHeader";
const GetCustomer = () => {
  const { listCustomer, getAll } = useCustomer();

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/register/customer/${id}`);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Option>
      <OptionOverlay>
        <OptionHeader tittle="Cliente">{}</OptionHeader>
        <OptionBody>
          <div className={styles.customerListContainer}>
            <h2>Listado de Clientes</h2>

            <table className={styles.table}>
              {listCustomer?.map((customer: any, index: number) => (
                <tr key={index} onClick={() => handleClick(customer.id)}>
                  <td>{customer.id}</td>
                  <td>{customer.type}</td>
                  <td>{customer.rut}</td>
                  <td>{customer.name}</td>
                  <td>{customer.address}</td>
                  <td>{customer.district}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                </tr>
              ))}
            </table>
          </div>
        </OptionBody>
      </OptionOverlay>
    </Option>
  );
};

export default GetCustomer;
