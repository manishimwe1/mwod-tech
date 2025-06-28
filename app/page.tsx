import GenerateQrcode from "@/components/GenerateQrcode";
import { ShowMessage } from "@/components/ShowMessage";
import Image from "next/image";

export default function Home() {
  return (
   <main className="container px-4 lg:px-8 flex flex-col h-screen justify-center items-center w-full">
   <ShowMessage/>
   </main>
  );
}
