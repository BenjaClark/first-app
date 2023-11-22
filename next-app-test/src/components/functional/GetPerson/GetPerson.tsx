import React, { useState, useEffect } from "react";

import Option from "@/components/layout/Option";
import { usePerson } from "@/store/hooks";

import styles from "./GetPerson.module.scss";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";

const GetPerson = () => {
  const { listPerson, getAll } = usePerson();

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/register/person/${id}`);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Option>
      <div className={styles.personListContainer}>
        <h2>Listado de Personas</h2>

        <table className={styles.table}>
          {listPerson?.map((person: any, index: number) => (
            <tr key={index} onClick={() => handleClick(person.id)}>
              <td>{person.id}</td>
              <td>{person.rut}</td>
              <td>{person.name}</td>
              <td>
                {person.paternalLastName} {person.maternalLastName}
              </td>
              <td>{person.address}</td>
              <td>{person.district}</td>
              <td>{person.email}</td>
              <td>{person.phone}</td>
            </tr>
          ))}
        </table>
      </div>
    </Option>
  );
};

export default GetPerson;
