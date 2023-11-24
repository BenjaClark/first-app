import React, { useState, useEffect } from "react";
import { useUser } from "@/store/hooks";
import { useRouter } from "next/navigation";

import Option from "@/components/layout/Option";

import styles from "./GetUser.module.scss";

import {
  OptionBody,
  OptionHeader,
  OptionOverlay,
} from "@/components/layout/OptionHeader";
import Button from "@/components/ui/Button";

const GetUser = () => {
  const { listUser, getAll } = useUser();

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/register/user/${id}`);
  };

  const newHandleClick = () => {
    router.push(`/register/user/new`);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Option>
      <OptionOverlay>
        <OptionHeader tittle="Usuarios">{}</OptionHeader>
        <OptionBody>
          <div className={styles.userListContainer}>
            <table className={styles.table}>
              {listUser?.map((user: any, index: number) => (
                <tr key={index} onClick={() => handleClick(user.id)}>
                  <td>{user.id}</td>
                  <td>{user.rut}</td>
                  <td>{user.name}</td>
                  <td>
                    {user.paternalLastName} {user.maternalLastName}
                  </td>
                  <td>{user.address}</td>
                  <td>{user.district}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
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

export default GetUser;
