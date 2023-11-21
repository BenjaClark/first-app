import React, { useEffect } from "react";

import Option from "@/components/layout/Option";
import { useCompany } from "@/store/hooks";

import styles from "./GetCompany.module.scss";

const GetCompany = () => {
  const { listCompany, getAll } = useCompany();

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Option>
      <div className={styles.companyListContainer}>
        <h2>Listado de Empresas</h2>
        <ul className={styles.companyList}>
          {listCompany?.map((company: any, index: number) => (
            <li className={styles.li} key={company.id}>
              <div className={styles.field}>
                <span>ID:</span> {company.id}
              </div>
              <div className={styles.field}>
                <span>RUT:</span> {company.rut}
              </div>
              <div className={styles.field}>
                <span>Nombre de fantasía:</span> {company.fantasyName}
              </div>
              <div className={styles.field}>
                <span>Nombre:</span> {company.name}
              </div>
              <div className={styles.field}>
                <span>Actividad:</span> {company.activity}
              </div>
              <div className={styles.field}>
                <span>Dirección:</span> {company.address}
              </div>
              <div className={styles.field}>
                <span>Comuna:</span> {company.district}
              </div>
              <div className={styles.field}>
                <span>Email:</span> {company.email}
              </div>
              <div className={styles.field}>
                <span>Teléfono:</span> {company.phone}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Option>
  );
};

export default GetCompany;
