"use client";

import React from "react";

import GetUser from "@/components/functional/GetUser";
import { useUser } from "@/store/hooks";
import ScreenLoader from "@/components/layout/ScreenLoader";

export default function GetUserPage() {
  const { isLoading } = useUser();
  return (
    <>
      {isLoading && <ScreenLoader />}
      <GetUser />
    </>
  );
}
