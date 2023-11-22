"use client";

import Customer from "@/components/functional/Customer";
import React from "react";

export default function CustomerItemPage({
  params,
}: {
  params: { id: string };
}) {
  return <Customer id={params.id} />;
}
