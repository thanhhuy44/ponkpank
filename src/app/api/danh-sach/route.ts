import { NextRequest } from "next/server";
import * as cheerio from "cheerio";
import axios, { HttpStatusCode } from "axios";
import { convertImageURL } from "@/utils";

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

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const key = searchParams.get("key");
  const page = searchParams.get("page");
  if (key && page) {
    try {
      const response = await axios.get(
        `https://thanhnien.vn/timelinelist/${key}/${page}.htm`
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
        message: "Internal Server Error!",
        data: null,
      });
    }
  }
}
