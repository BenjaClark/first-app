import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePerson } from "@/store/hooks";

import Option from "@/components/layout/Option";
import Button from "@/components/ui/Button";

import styles from "./GetPerson.module.scss";

import {
  OptionBody,
  OptionHeader,
  OptionOverlay,
} from "@/components/layout/OptionHeader";

const GetPerson = () => {
  const { listPerson, getAll } = usePerson();

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/register/person/${id}`);
  };

  const newHandleClick = () => {
    router.push(`/register/person/${"new"}`);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Option>
      <OptionOverlay>
        <OptionHeader tittle="Persona">{}</OptionHeader>
        <OptionBody>
          <div className={styles.personListContainer}>
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
            <Button label="Nuevo" onClick={newHandleClick}></Button>
          </div>
        </OptionBody>
      </OptionOverlay>
    </Option>
  );
};

export default GetPerson;
