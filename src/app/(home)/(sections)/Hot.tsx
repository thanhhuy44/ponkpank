"use client";

import { News } from "@/types";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const HotNews = ({ slug, title }: News) => (
  <div className="px-4 py-2 bg-primary-600 text-white">
    <Link href={`/bai-viet${slug}`} className="font-medium">
      {title}
    </Link>
  </div>
);

function Hot({ data }: { data: Array<News> }) {
  return (
    <section className="container">
      <Marquee autoFill className="bg-primary-600">
        {data.map((news, index) => (
          <HotNews key={index} {...news} />
        ))}
      </Marquee>
    </section>
  );
}

export default Hot;
