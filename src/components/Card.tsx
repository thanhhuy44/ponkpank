import { News } from "@/types";
import Image from "next/image";
import Link from "next/link";

function Card({ thumbnail, id, slug, title, description, category }: News) {
  return (
    <div className="rounded-md overflow-hidden">
      <div className="relative group">
        <Image
          className="aspect-[3/4] object-cover object-center w-full h-auto"
          src={thumbnail}
          alt={title}
          width={400}
          height={400}
        />
        <div className="absolute duration-300 left-0 right-0 top-0 bottom-0 bg-gradient-to-t from-black/80 group-hover:from-black/100 group-hover:to-black/30 to-black/0 flex items-end p-6">
          <div className="flex flex-col gap-y-2">
            <span className="py-1 px-2 rounded-md bg-primary-600 w-fit">
              <span className="text-sm font-medium text-primary-50">
                {category}
              </span>
            </span>
            <Link href={`/bai-viet${slug}`} className="">
              <h5 className="text-lg font-semibold text-white hover:text-primary-500 duration-300 line-clamp-3">
                {title}
              </h5>
            </Link>
            <div className="hidden lg:block max-h-0 group-hover:max-h-[500px] origin-bottom duration-500 scale-y-0 group-hover:scale-y-100 opacity-0 group-hover:opacity-100">
              <Link href={`/bai-viet${slug}`} title={title}>
                <p className="text-primary-200 line-clamp-4">{description}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
