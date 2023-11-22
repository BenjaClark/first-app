"use client";

import User from "@/components/functional/User";
import React from "react";

export default function UserItemPage({ params }: { params: { id: string } }) {
  return <User id={params.id} />;
}
