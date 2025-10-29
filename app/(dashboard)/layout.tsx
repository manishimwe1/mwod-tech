import ClientLayout from "@/components/ClientWrapper";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "EasyFix - Electronics Repair & Shop",
  description:
    "Your one-stop destination for electronics repair services and new device purchases. Expert repairs, great deals, and quality electronics.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main suppressHydrationWarning={true}>
      <ClientLayout>{children}</ClientLayout>
    </main>
  );
}
