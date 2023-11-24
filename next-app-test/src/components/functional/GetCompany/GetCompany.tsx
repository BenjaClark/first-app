import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCompany } from "@/store/hooks";

import Option from "@/components/layout/Option";

import Button from "@/components/ui/Button";

import styles from "./GetCompany.module.scss";

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

  const newHandleClick = () => {
    router.push(`/register/company/new`);
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
            <Button label="Nuevo" onClick={newHandleClick}></Button>
          </div>
        </OptionBody>
      </OptionOverlay>
    </Option>
  );
};

export default GetCompany;
