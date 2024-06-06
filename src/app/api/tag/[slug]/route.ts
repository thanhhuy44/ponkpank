import { convertImageURL } from "@/utils";
import axios, { HttpStatusCode } from "axios";
import * as cheerio from "cheerio";
import { NextRequest } from "next/server";

const getTopNews = async (html: string) => {
  const $ = cheerio.load(html);

  const itemFirst = {
    id: $(".item-first a").attr("data-id")?.trim(),
    slug: $(".item-first").attr("data-vr-contentbox-url")?.trim(),
    thumbnail: convertImageURL($(".item-first img").attr("src") as string),
    title: $(".item-first .box-title-text").text().trim(),
  };

  const relatedItems = $(".item-related .box-category-item")
    .get()
    .map((item) => {
      return Object.assign({
        id: $("a", item).attr("data-id")?.trim(),
        slug: $(item).attr("data-vr-contentbox-url")?.trim(),
        thumbnail: convertImageURL(
          $("img", item).attr("src")?.trim() as string
        ),
        title: $("img", item).attr("title")?.trim(),
      });
    });

  const subItems = $(".box-category-sub .box-category-item")
    .get()
    .map((item) => {
      return Object.assign({
        id: $("a", item).attr("data-id")?.trim(),
        slug: $(item).attr("data-vr-contentbox-url")?.trim(),
        thumbnail: convertImageURL(
          $("img", item).attr("src")?.trim() as string
        ),
        title: $("img", item).attr("title")?.trim(),
      });
    });

  return [itemFirst, ...relatedItems, ...subItems];
};

const getLastNews = async (html: string) => {
  const $ = cheerio.load(html);
  return $(".box-category-item")
    .get()
    .filter(
      (item) =>
        $(".box-category-content .box-category-category", item)
          .text()
          .trim() !== "Thể thao khác"
    )
    .map((item) => {
      const id = $(item).attr("data-id")?.trim();
      const thumbnail = convertImageURL(
        $("img", item).attr("src")?.trim() as string
      );
      const category = $(".box-category-content .box-category-category", item)
        .text()
        .trim();
      const title = $(".box-category-content .box-title-text", item)
        .text()
        .trim();
      const description = $(".box-category-content .box-category-sapo", item)
        .text()
        .trim();
      return Object.assign({ id, category, thumbnail, title, description });
    });
};

const getConfig = async (html: string) => {
  const $ = cheerio.load(html);
  return $("input", html)
    .get()
    .map((item) => {
      const id = $(item).attr("id")?.trim();
      const name = $(item).attr("name")?.trim();
      const value = $(item).attr("value")?.trim();
      return Object.assign({ id, name, value });
    });
};

const getList = async (html: string) => {
  const $ = cheerio.load(html);
  return $(".box-category-item")
    .get()
    .filter(
      (item) =>
        $(".box-category-content .box-category-category", item)
          .text()
          .trim() !== "Thể thao khác"
    )
    .map((item) => {
      const id = $(item).attr("data-id")?.trim();
      const thumbnail = convertImageURL(
        $("img", item).attr("src")?.trim() as string
      );
      const category = $(".box-category-content .box-category-category", item)
        .text()
        .trim();
      const title = $(".box-category-content .box-title-text", item)
        .text()
        .trim();
      const description = $(".box-category-content .box-category-sapo", item)
        .text()
        .trim();
      return Object.assign({ id, category, thumbnail, title, description });
    });
};

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const query = req.nextUrl.searchParams;
  const page = query.get("page");
  if (page) {
    try {
      const response = await axios.get(
        `https://thanhnien.vn/timelinetag/${slug.split(".")[0]}/${page}.htm`
      );
      const $ = cheerio.load(response.data);
      const listNews = await getList($.html() as string);
      return Response.json({
        statusCode: HttpStatusCode.Ok,
        message: "OK!",
        data: listNews,
      });
    } catch (error) {
      console.error(error);
      return Response.json({
        statusCode: HttpStatusCode.InternalServerError,
        message: "Internal Server Error",
        data: null,
      });
    }
  }

  try {
    const response = await axios.get("https://thanhnien.vn/" + slug);
    const $ = cheerio.load(response.data);
    const config = await getConfig(
      $("#content .configHidden").html() as string
    );

    const topNews = await getTopNews(
      $("#content .list__tt-focus .box-category-middle").html() as string
    );

    const lastNews = await getLastNews(
      $("#content .list__stream .box-category-middle").html() as string
    );

    return Response.json({
      statusCode: HttpStatusCode.Ok,
      message: "OK!",
      data: {
        config,
        topNews,
        lastNews,
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      statusCode: HttpStatusCode.InternalServerError,
      message: "Internal Server Error",
      data: null,
    });
  }
}
