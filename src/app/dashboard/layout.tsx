import { Toaster } from "@/components/ui/toaster";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  console.log(session, "ACCESS TOKEN FROM DASHBOARD");

  if (!session || !session?.accessToken) {
    signOut();
    redirect("/signin");
  }

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
