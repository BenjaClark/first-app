"use client";

import React from "react";

import GetCompany from "@/components/functional/GetCompany";
import { useCompany } from "@/store/hooks";
import ScreenLoader from "@/components/layout/ScreenLoader";

export default function GetCompanyPage() {
  const { isLoading } = useCompany();
  return (
    <>
      {isLoading && <ScreenLoader />}
      <GetCompany />
    </>
  );
}
