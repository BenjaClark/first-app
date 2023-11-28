import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProduct } from "@/store/hooks";

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

const GetProduct = () => {
  const { listProduct, getAll, resetProduct, isLoading } = useProduct();

  const router = useRouter();

  const handleClickRegister = (id: string) => {
    router.push(`/register/product/${id}`);
  };

  const handleClickNew = () => {
    router.push(`/register/product/new`);
    resetProduct();
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Option>
      <OptionOverlay>
        <OptionHeader tittle="Producto">{}</OptionHeader>
        <OptionBody>
          <ContentCell gap="5px">
            <Table width="800px" height="calc(100vh - 205px)">
              <TableHeader>
                <TableCell width="250px">ID</TableCell>
                <TableCell width="150px">Codigo</TableCell>
                <TableCell width="200px">Nombre</TableCell>
                <TableCell width="180px">Precio</TableCell>
                <TableCell width="6px"></TableCell>
              </TableHeader>

              <TableDetail>
                {listProduct?.map((product: any, index: number) => (
                  <TableRow
                    key={index}
                    onClick={() => handleClickRegister(product.id)}
                  >
                    <TableCell width="250px" align="center">
                      {product.id}
                    </TableCell>

                    <TableCell width="150px" align="center">
                      {product.code}
                    </TableCell>

                    <TableCell width="200px" align="center">
                      {product.name}
                    </TableCell>

                    <TableCell width="180px" align="center">
                      {product.price}
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

export default GetProduct;
