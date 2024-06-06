import Hero from "./(sections)/Hero";
import Hot from "./(sections)/Hot";
import Error from "next/error";
import axios from "axios";
import { News, PageConfig } from "@/types";
import request from "@/utils/axiosClient";
import Latest from "./(sections)/Latest";

async function getData() {
  const response = await request.get("/home");
  return response?.data as {
    config: PageConfig;
    topNews: News[];
    lastNews: News[];
  };
}

export default async function Page() {
  const data = await getData();
  return (
    <main className="mt-6 mb-20 flex flex-col gap-y-12">
      <Hero data={data.topNews} />
      <Hot data={data.lastNews} />
      <Latest data={data.lastNews} />
    </main>
  );
}
