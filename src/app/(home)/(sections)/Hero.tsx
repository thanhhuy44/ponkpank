"use client";

import { News } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

function Hero({ data }: { data: Array<News> }) {
  return (
    <section className="">
      <Swiper>
        {data.map((news, index) => (
          <SwiperSlide key={index}>
            <div className="container">
              <div className="relative rounded-xl overflow-hidden cursor-grab">
                <Image
                  width={1500}
                  height={1000}
                  src={news.thumbnail}
                  alt=""
                  className="w-full h-auto aspect-[2] object-cover object-center"
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-black/0 flex items-end p-20">
                  <div className="w-2/3 flex flex-col gap-y-6">
                    <span className="rounded-md py-1 px-2 bg-primary-600 w-fit">
                      <span className="text-primary-50 text-sm font-medium">
                        Nổi bật
                      </span>
                    </span>
                    <Link href={`/bai-viet${news.slug}`}>
                      <h1 className="text-3xl font-extrabold text-white hover:text-primary-200 duration-300">
                        {news.title}
                      </h1>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Hero;
