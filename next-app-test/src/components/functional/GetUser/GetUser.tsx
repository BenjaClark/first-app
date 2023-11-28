import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/store/hooks";

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

const GetUser = () => {
  const { listUser, getAll, isLoading, resetUser } = useUser();

  const router = useRouter();

  const handleClickRegister = (id: string) => {
    router.push(`/register/user/${id}`);
  };

  const handleClickNew = () => {
    router.push(`/register/user/new`);
    resetUser();
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Option>
      <OptionOverlay>
        <OptionHeader tittle="Persona">{}</OptionHeader>
        <OptionBody>
          <ContentCell gap="5px">
            <Table width="1135px" height="calc(100vh - 205px)">
              <TableHeader>
                <TableCell width="240px">ID</TableCell>
                <TableCell width="91px">Rut</TableCell>
                <TableCell width="100px">Nombre</TableCell>
                <TableCell width="130px">Apellidos</TableCell>
                <TableCell width="228px">Dirección</TableCell>
                <TableCell width="80px">Comuna</TableCell>
                <TableCell width="170px">Correo electrónico</TableCell>
                <TableCell width="79px">Teléfono</TableCell>
                <TableCell width="6px"></TableCell>
              </TableHeader>

              <TableDetail>
                {listUser?.map((user: any, index: number) => (
                  <TableRow
                    key={index}
                    onClick={() => handleClickRegister(user.id)}
                  >
                    <TableCell width="238px" align="center">
                      {user.id}
                    </TableCell>

                    <TableCell width="90px" align="center">
                      {user.rut}
                    </TableCell>

                    <TableCell width="100px" align="center">
                      {user.name}
                    </TableCell>

                    <TableCell width="130px" align="center">
                      {user.paternalLastName} {user.maternalLastName}
                    </TableCell>

                    <TableCell width="228px" align="center">
                      {user.address}
                    </TableCell>

                    <TableCell width="80px" align="center">
                      {user.district}
                    </TableCell>

                    <TableCell width="170px" align="center">
                      {user.email}
                    </TableCell>

                    <TableCell width="80px" align="center">
                      {user.phone}
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

export default GetUser;
