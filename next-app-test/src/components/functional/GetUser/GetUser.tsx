import React, { useState, useEffect } from "react";

import Option from "@/components/layout/Option";
import { useUser } from "@/store/hooks";

import styles from "./GetUser.module.scss";

const GetUser = () => {
  const { listUser, getAll } = useUser();

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Option>
      <div className={styles.userListContainer}>
        <h2>Listado de Usuarios</h2>
        <ul className={styles.userList}>
          {listUser?.map((user: any, index: number) => (
            <li className={styles.li} key={user.id}>
              <div className={styles.field}>
                <span>ID:</span> {user.id}
              </div>
              <div className={styles.field}>
                <span>person_id:</span> {user.person_id}
              </div>
              <div className={styles.field}>
                <span>Login:</span> {user.login}
              </div>
              <div className={styles.field}>
                <span>RUT:</span> {user.rut}
              </div>
              <div className={styles.field}>
                <span>Nombre:</span> {user.name}
              </div>
              <div className={styles.field}>
                <span>Apellido paterno:</span> {user.paternalLastName}
              </div>
              <div className={styles.field}>
                <span>Apellido materno:</span> {user.maternalLastName}
              </div>
              <div className={styles.field}>
                <span>Dirección:</span> {user.address}
              </div>
              <div className={styles.field}>
                <span>Comuna:</span> {user.district}
              </div>
              <div className={styles.field}>
                <span>Correo electrónico:</span> {user.email}
              </div>
              <div className={styles.field}>
                <span>Teléfono:</span> {user.phone}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Option>
  );
};

export default GetUser;
