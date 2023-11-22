import React, { useState, useEffect } from "react";

import Option from "@/components/layout/Option";
import { useUser } from "@/store/hooks";

import styles from "./GetUser.module.scss";
import { useRouter } from "next/navigation";
import {
  OptionBody,
  OptionHeader,
  OptionOverlay,
} from "@/components/layout/OptionHeader";
const GetUser = () => {
  const { listUser, getAll } = useUser();

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/register/user/${id}`);
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
            <h2>Listado de Usuarios</h2>

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
          </div>
        </OptionBody>
      </OptionOverlay>
    </Option>
  );
};

export default GetUser;
