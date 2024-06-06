import { convertImageURL } from "@/utils";
import axios, { HttpStatusCode } from "axios";
import * as cheerio from "cheerio";

const getRelated = async (html: string) => {
  const $ = cheerio.load(html);
  const mainHTML = $(".box-category-middle .box-category-item").first();
  const subHTML = $(".box-category-middle").last();
  const main = {
    id: $(mainHTML).attr("data-id"),
    slug: $("a", mainHTML).attr("href")?.trim(),
    title: $("a", mainHTML).attr("title")?.trim(),
    thumbnail: convertImageURL(
      $("a img", mainHTML).attr("src")?.trim() as string
    ),
    description: $(".box-category-content .box-category-sapo", mainHTML)
      .text()
      ?.trim(),
  };

  const sub = $(".box-category-item-small", subHTML)
    .get()
    .map((item) => {
      return Object.assign({
        id: $(item).attr("data-id"),
        slug: $("a", item).attr("href"),
        title: $("h3", item).text().trim(),
      });
    });

  return {
    main,
    sub,
  };
};

const getTags = async (html: string) => {
  const $ = cheerio.load(html);
  return $("a")
    .get()
    .map((item) => {
      return Object.assign({
        name: $(item).attr("title"),
        slug: $(item).attr("href"),
      });
    });
};

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const response = await axios.get("https://thanhnien.vn/" + slug);
  if (response.data) {
    const $ = cheerio.load(response.data);
    const title = $("#content .detail-title span").text().trim();
    if (!title) {
      return Response.json(
        {
          statusCode: HttpStatusCode.NotFound,
          message: "Not found!",
          data: null,
        },
        { status: HttpStatusCode.NotFound }
      );
    }
    const id = slug.split("-")[slug.split("-").length - 1].split(".")[0];
    const thumbnail = $(
      "#content .detail__cmain-flex .detail__cmain-main .detail-cmain .VCSortableInPreviewMode img"
    )
      .first()
      .attr("data-original")
      ?.trim() as string;
    const description = $(
      "#content .detail__cmain-flex .detail__cmain-main .detail-sapo"
    )
      .text()
      .trim();
    const content = $(
      "#content .detail__cmain-flex .detail__cmain-main .detail-cmain"
    )
      .removeAttr("href")
      .html()
      ?.trim();

    const relatedNews = await getRelated(
      $(".detail__related").html() as string
    );

    const tags = await getTags($(".detail-tab").html() as string);
    return Response.json(
      {
        statusCode: HttpStatusCode.Ok,
        message: "OK!",
        data: {
          id,
          slug,
          title,
          thumbnail,
          description,
          content,
          relatedNews,
          tags,
        },
      },
      {
        status: HttpStatusCode.Ok,
      }
    );
  } else {
    return Response.error();
  }
}
