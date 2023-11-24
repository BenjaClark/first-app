import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomer } from "@/store/hooks";

import Option from "@/components/layout/Option";

import styles from "./GetCustomer.module.scss";

import {
  OptionBody,
  OptionHeader,
  OptionOverlay,
} from "@/components/layout/OptionHeader";
import Button from "@/components/ui/Button";

const GetCustomer = () => {
  const { listCustomer, getAll } = useCustomer();

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/register/customer/${id}`);
  };

  const newHandleClick = () => {
    router.push(`/register/customer/new`);
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
            <Button label="Nuevo" onClick={newHandleClick}></Button>
          </div>
        </OptionBody>
      </OptionOverlay>
    </Option>
  );
};

export default GetCustomer;
