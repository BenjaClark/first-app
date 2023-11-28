import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomer } from "@/store/hooks";

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

const GetCustomer = () => {
  const { listCustomer, getAll, isLoading, resetCustomer } = useCustomer();

  const router = useRouter();

  const handleClickRegister = (id: string) => {
    router.push(`/register/customer/${id}`);
  };

  const handleClickNew = () => {
    router.push(`/register/customer/new`);
    resetCustomer();
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Option>
      <OptionOverlay>
        <OptionHeader tittle="Cliente">{}</OptionHeader>
        <OptionBody>
          <ContentCell gap="5px">
            <Table width="1135px" height="calc(100vh - 205px)">
              <TableHeader>
                <TableCell width="240px">ID</TableCell>
                <TableCell width="90px">Tipo</TableCell>
                <TableCell width="100px">Rut</TableCell>
                <TableCell width="130px">Nombre</TableCell>
                <TableCell width="228px">Dirección</TableCell>
                <TableCell width="81px">Comuna</TableCell>
                <TableCell width="170px">Correo electrónico</TableCell>
                <TableCell width="79px">Teléfono</TableCell>
                <TableCell width="6px"></TableCell>
              </TableHeader>

              <TableDetail>
                {listCustomer?.map((customer: any, index: number) => (
                  <TableRow
                    key={index}
                    onClick={() => handleClickRegister(customer.id)}
                  >
                    <TableCell width="238px" align="center">
                      {customer.id}
                    </TableCell>

                    <TableCell width="90px" align="center">
                      {customer.type}
                    </TableCell>

                    <TableCell width="100px" align="center">
                      {customer.rut}
                    </TableCell>

                    <TableCell width="131px" align="center">
                      {customer.name}
                    </TableCell>

                    <TableCell width="228px" align="center">
                      {customer.address}
                    </TableCell>

                    <TableCell width="82px" align="center">
                      {customer.district}
                    </TableCell>

                    <TableCell width="171px" align="center">
                      {customer.email}
                    </TableCell>

                    <TableCell width="80px" align="center">
                      {customer.phone}
                    </TableCell>
                  </TableRow>
                ))}
              </TableDetail>
            </Table>
          </ContentCell>
        </OptionBody>

        <Button
          label="Nuevo"
          onClick={handleClickNew}
          isLoading={isLoading}
          backgroundColor="gray"
        ></Button>
      </OptionOverlay>
    </Option>
  );
};

export default GetCustomer;
