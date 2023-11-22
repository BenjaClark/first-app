"use client";

import Product from "@/components/functional/Product";
import React from "react";

export default function ProductItemPage({
  params,
}: {
  params: { id: string };
}) {
  return <Product id={params.id} />;
}
