"use client";

import Card from "@/components/Card";
import { News } from "@/types";
import { useState } from "react";

function Latest({ data }: { data: Array<News> }) {
  const [page, setPage] = useState<number>(1);
  const [news, setNews] = useState<Array<News>>(data);

  return (
    <section className="container flex flex-col gap-y-6">
      <h1 className="text-4xl font-bold">Mới nhất</h1>
      <div className="grid grid-cols-4 gap-x-6 gap-y-8">
        {news.map((item, index) => (
          <Card {...item} key={index} />
        ))}
      </div>
    </section>
  );
}

export default Latest;
