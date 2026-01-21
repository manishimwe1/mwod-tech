import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: {
    default:
      "Buy Laptops in Rwanda | New & Used Computers in Kigali – mwod Technology",
    template: "%s | mwod Technology",
  },
  description:
    "Buy affordable new and used laptops in Rwanda. mwod Technology Kigali offers HP, Dell, Lenovo computers, accessories & fast delivery across Rwanda.",
  keywords: [
    "electronics repair",
    "buy electronics",
    "sell electronics",
    "tech services",
    "gadgets",
    "smartphones",
    "laptops",
    "accessories",
    "electronics store Rwanda",
    "buy laptops Rwanda",
    "sell electronics Rwanda",
    "electronics repair Rwanda",
    "phone repair Kigali",
    "laptops and accessories",
    "smartphones Rwanda",
    "tech shop Kigali",
  ],
  authors: [{ name: "emino" }],
  creator: "mwod Technology",
  publisher: "mwod Technology",
  openGraph: {
    title: "mwod Technology - Sell and Buy some of electronics",
    description:
      "Your one-stop destination for electronics repair services and new device purchases. Expert repairs, great deals, and quality electronics.",
    url: "https://mwod-tech.vercel.app/", // Replace with your actual URL
    siteName: "mwod Technology",
    images: [
      {
        url: "https://mwod-tech.vercel.app/logo1.png", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "mwod Technology - Electronics Repair and Sales",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mwod Technology - Sell and Buy some of electronics",
    description:
      "Your one-stop destination for electronics repair services and new device purchases. Expert repairs, great deals, and quality electronics.",
    // images: ["https://mwod-tech.vercel.app//twitter-image.jpg"], // Replace with your actual Twitter image
    creator: "@eminodev", // Replace with your Twitter handle
    images: ["https://mwod-tech.vercel.app/logo1.png"],
  },
  icons: ["https://mwod-tech.vercel.app/logo1.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <main className="min-h-screen flex flex-col justify-start w-full">
      <Header />
      {children}
      <Footer />

    </main>
  );
}
