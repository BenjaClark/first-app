"use client";

import React from "react";

import GetProduct from "@/components/functional/GetProduct";
import { useProduct } from "@/store/hooks";
import ScreenLoader from "@/components/layout/ScreenLoader";

export default function GetProductPage() {
  const { isLoading } = useProduct();
  return (
    <>
      {isLoading && <ScreenLoader />}
      <GetProduct />
    </>
  );
}
