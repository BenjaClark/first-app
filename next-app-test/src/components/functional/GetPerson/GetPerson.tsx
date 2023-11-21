import React, { useState, useEffect } from "react";

import Option from "@/components/layout/Option";
import { usePerson } from "@/store/hooks";

import styles from "./GetPerson.module.scss";

const GetPerson = () => {
  const { listPerson } = usePerson();

  return (
    <Option>
      {listPerson?.map((person: any) => (
        <li className={styles.li} key={person.id}>
          <ul>ID:{person.id}</ul>
          <br />
          <ul>RUT:{person.rut}</ul>
          <br />
          <ul>Nombre:{person.name}</ul>
          <br />
          <ul>
            Apellidos:{person.paternalLastName} {person.maternalLastName}
          </ul>
          <br />
          <ul>Dirección:{person.address}</ul>
          <br />
          <ul>Comuna:{person.district}</ul>
          <br />
          <ul>Email:{person.email}</ul>
          <br />
          <ul>Teléfono:{person.phone}</ul>
          <br />
        </li>
      ))}
    </Option>
  );
};

export default GetPerson;
