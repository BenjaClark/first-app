"use client";

import Person from "@/components/functional/Person";
import React from "react";

export default function PersonItemPage({ params }: { params: { id: string } }) {
  return <Person id={params.id} />;
}
