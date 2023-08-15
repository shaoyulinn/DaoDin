import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import Topbar from "@/components/Topbar";
import Group from "@/components/Group";

export default function Home() {
  return (
    <>
      <Head>
        <title>DaoDin</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Topbar />
      <main className="min-h-screen px-44 pt-8 bg-backgroundColor">
        <div className="mb-8 flex gap-7">
          <button
            type="button"
            className="w-[9%] px-8 bg-primaryColor text-xl font-bold text-white rounded-[50px]"
          >
            Filter
          </button>
          <button
            type="button"
            className="w-[9%] px-8 py-2 bg-primaryColor text-xl font-bold text-white rounded-[50px]"
          >
            Sortby
          </button>
        </div>
        <div className="min-h-screen px-16 pt-5 bg-white rounded-t-[20px]">
          <Group />
          <Group />
          <Group />
        </div>
      </main>
    </>
  );
}
