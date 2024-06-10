import React from "react";
import ClientLoginPage from "./components/client-login-page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  console.log(session?.accessToken, "ACCESS TOKEN FROM SIGNIN");

  if (session?.accessToken) {
    redirect("/dashboard");
  }

  return <ClientLoginPage />;
}
