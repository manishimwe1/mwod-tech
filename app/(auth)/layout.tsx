
import { auth } from "@clerk/nextjs/server";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {isAuthenticated} =await auth()

  console.log({isAuthenticated});
  
  
  return <main>{children}</main>;
}