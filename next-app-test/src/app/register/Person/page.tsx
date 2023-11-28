"use client";

import React from "react";

import GetPerson from "@/components/functional/GetPerson";
import ScreenLoader from "@/components/layout/ScreenLoader";
import { usePerson } from "@/store/hooks";

export default function GetPersonPage() {
  const { isLoading } = usePerson();

  return (
    <>
      {isLoading && <ScreenLoader />}
      <GetPerson />
    </>
  );
}
