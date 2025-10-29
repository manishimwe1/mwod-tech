import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Canteen Management System",
//   description: "a stock managing and financial app",
//   icons: {
//     icon: "/convex.svg",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex items-center  justify-center w-full min-h-screen">
      {children}
    </main>
  );
}
