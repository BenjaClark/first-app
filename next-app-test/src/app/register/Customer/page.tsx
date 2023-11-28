"use client";

import React from "react";

import GetCustomer from "@/components/functional/GetCustomer";
import { useCustomer } from "@/store/hooks";
import ScreenLoader from "@/components/layout/ScreenLoader";

export default function GetCustomerPage() {
  const { isLoading } = useCustomer();
  return (
    <>
      {isLoading && <ScreenLoader />}
      <GetCustomer />
    </>
  );
}
