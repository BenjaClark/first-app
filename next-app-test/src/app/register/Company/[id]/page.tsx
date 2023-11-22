"use client";

import Company from "@/components/functional/Company";
import React from "react";

export default function CompanyItemPage({
  params,
}: {
  params: { id: string };
}) {
  return <Company id={params.id} />;
}
