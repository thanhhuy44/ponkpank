import { ApiResponse, NewsDetail } from "@/types";
import request from "@/utils/axiosClient";
import Image from "next/image";
import Link from "next/link";

async function getData(slug: string) {
  const response = (await request.get("/detail/" + slug)) as ApiResponse;
  if (response.statusCode === 200) {
    return response.data as NewsDetail;
  } else {
    throw new Error("Failed to fetch data");
  }
}

async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const { title, description, content, relatedNews, tags } =
    await getData(slug);

  return (
    <main className="my-20 container xl:max-w-5xl">
      <section>
        <h1 className="text-4xl font-extrabold leading-[1.5]">{title}</h1>
        <div className="my-12">
          <p className="font-semibold italic">{description}</p>
        </div>
        <article
          id="news-content"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></article>
      </section>
      <section className="mt-12 py-12 border-t flex flex-col gap-y-8">
        <h3 className="text-2xl font-bold">Tin liên quan</h3>
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center gap-4">
            <Link
              className="w-1/3"
              href={relatedNews.main.slug}
              title={relatedNews.main.title}
            >
              <Image
                width={800}
                height={600}
                src={relatedNews.main.thumbnail}
                alt={relatedNews.main.title}
              />
            </Link>
            <div className="flex-1 flex flex-col gap-y-3">
              <Link href={`/bai-viet${relatedNews.main.slug}`}>
                <h6 className="text-xl font-bold line-clamp-2 hover:text-primary-500 duration-300">
                  {relatedNews.main.title}
                </h6>
              </Link>
              <Link href={`/bai-viet${relatedNews.main.slug}`}>
                <p>{relatedNews.main.description}</p>
              </Link>
            </div>
          </div>
          <div className="pt-3 border-t">
            <ul className="flex flex-col gap-y-3 pl-10 list-disc">
              {relatedNews.sub.map((sub, index) => (
                <li key={index}>
                  <Link
                    href={`/bai-viet${sub.slug}`}
                    title={sub.title}
                    className="font-bold hover:text-primary-500 duration-300"
                  >
                    {sub.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="mt-12 py-12 border-t flex items-center gap-2">
        {tags.map((tag, index) => (
          <Link
            className="py-1 px-2 border hover:border-primary-500 duration-300"
            key={index}
            href={"#"}
          >
            <span>{tag.name}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default Page;
