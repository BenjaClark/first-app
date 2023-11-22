import React, { useEffect } from "react";

import Option from "@/components/layout/Option";
import { useCompany } from "@/store/hooks";

import styles from "./GetCompany.module.scss";
import { useRouter } from "next/navigation";
import {
  OptionBody,
  OptionHeader,
  OptionOverlay,
} from "@/components/layout/OptionHeader";
const GetCompany = () => {
  const { listCompany, getAll } = useCompany();

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/register/company/${id}`);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Option>
      <OptionOverlay>
        <OptionHeader tittle="Empresa">{}</OptionHeader>
        <OptionBody>
          <div className={styles.companyListContainer}>
            <h2>Listado de Empresas</h2>

            <table className={styles.table}>
              {listCompany?.map((company: any, index: number) => (
                <tr key={index} onClick={() => handleClick(company.id)}>
                  <td>{company.id}</td>
                  <td>{company.rut}</td>
                  <td>{company.fantasyName}</td>
                  <td>{company.name}</td>
                  <td>{company.activity}</td>
                  <td>{company.address}</td>
                  <td>{company.district}</td>
                  <td>{company.email}</td>
                  <td>{company.phone}</td>
                </tr>
              ))}
            </table>
          </div>
        </OptionBody>
      </OptionOverlay>
    </Option>
  );
};

export default GetCompany;
