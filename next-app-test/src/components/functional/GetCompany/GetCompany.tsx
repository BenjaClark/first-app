import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCompany } from "@/store/hooks";

import { ContentCell } from "@/components/layout/Content";
import Option from "@/components/layout/Option";
import {
  OptionBody,
  OptionHeader,
  OptionOverlay,
} from "@/components/layout/OptionHeader";

import Button from "@/components/ui/Button";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
} from "@/components/ui/Table/Table";

const GetCompany = () => {
  const { listCompany, getAll, isLoading, resetCompany } = useCompany();

  const router = useRouter();

  const handleClickRegister = (id: string) => {
    router.push(`/register/company/${id}`);
  };

  const HandleClickNew = () => {
    router.push(`/register/company/new`);
    resetCompany();
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Option>
      <OptionOverlay>
        <OptionHeader tittle="Empresa">{}</OptionHeader>
        <OptionBody>
          <ContentCell gap="5px">
            <Table width="1135px" height="calc(100vh - 205px)">
              <TableHeader>
                <TableCell width="201px">ID</TableCell>
                <TableCell width="91px">Rut</TableCell>
                <TableCell width="110px">Nombre de Fantasía</TableCell>
                <TableCell width="100px">Nombre</TableCell>
                <TableCell width="208px">Actividad</TableCell>
                <TableCell width="100px">Dirección</TableCell>
                <TableCell width="81px">Comuna</TableCell>
                <TableCell width="170px">Correo electrónico</TableCell>
                <TableCell width="78px">Teléfono</TableCell>
                <TableCell width="6px"></TableCell>
              </TableHeader>

              <TableDetail>
                {listCompany?.map((company: any, index: number) => (
                  <TableRow
                    key={index}
                    onClick={() => handleClickRegister(company.id)}
                  >
                    <TableCell width="196px" align="center">
                      {company.id}
                    </TableCell>

                    <TableCell width="90px" align="center">
                      {company.rut}
                    </TableCell>

                    <TableCell width="113px" align="center">
                      {company.fantasyName}
                    </TableCell>

                    <TableCell width="101px" align="center">
                      {company.name}
                    </TableCell>

                    <TableCell width="208px" align="center">
                      {company.activity}
                    </TableCell>

                    <TableCell width="101px" align="center">
                      {company.address}
                    </TableCell>

                    <TableCell width="78px" align="center">
                      {company.district}
                    </TableCell>

                    <TableCell width="170px" align="center">
                      {company.email}
                    </TableCell>

                    <TableCell width="80px" align="center">
                      {company.phone}
                    </TableCell>
                  </TableRow>
                ))}
              </TableDetail>
            </Table>
          </ContentCell>
        </OptionBody>

        <Button
          label="Nuevo"
          onClick={HandleClickNew}
          isLoading={isLoading}
          backgroundColor="gray"
        ></Button>
      </OptionOverlay>
    </Option>
  );
};

export default GetCompany;
