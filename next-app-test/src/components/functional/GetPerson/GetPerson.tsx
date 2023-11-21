import React, { useState, useEffect } from "react";

import Option from "@/components/layout/Option";
import { usePerson } from "@/store/hooks";

import styles from "./GetPerson.module.scss";

const GetPerson = () => {
  const { listPerson, getAll } = usePerson();

  console.log(listPerson);

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Option>
      <div className={styles.personListContainer}>
        <h2>Listado de Personas</h2>
        <ul className={styles.personList}>
          {listPerson?.map((person: any, index: number) => (
            <li className={styles.li} key={person.id}>
              <div className={styles.field}>
                <span>ID:</span> {person.id}
              </div>
              <div className={styles.field}>
                <span>RUT:</span> {person.rut}
              </div>
              <div className={styles.field}>
                <span>Nombre:</span> {person.name}
              </div>
              <div className={styles.field}>
                <span>Apellidos:</span> {person.paternalLastName}{" "}
                {person.maternalLastName}
              </div>
              <div className={styles.field}>
                <span>Dirección:</span> {person.address}
              </div>
              <div className={styles.field}>
                <span>Comuna:</span> {person.district}
              </div>
              <div className={styles.field}>
                <span>Email:</span> {person.email}
              </div>
              <div className={styles.field}>
                <span>Teléfono:</span> {person.phone}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Option>
  );
};

export default GetPerson;
