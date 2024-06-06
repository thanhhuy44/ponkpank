import axios, { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const league = searchParams.get("league");

  if (!league) {
    return Response.json({
      statusCode: HttpStatusCode.BadRequest,
      message: "Bad Request!",
      data: null,
    });
  }
  try {
    const response = await axios.get(
      "https://sport5s.cnnd.vn/sport5-api-data.htm?m=rank-topic&keyword=" +
        league
    );
    const data = response.data?.Data?.data;
    if (!data?.key) {
      return Response.json({
        statusCode: HttpStatusCode.NotFound,
        message: "Not found!",
        data: null,
      });
    }
    return Response.json(
      {
        statusCode: HttpStatusCode.Ok,
        message: "OK!",
        data: data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json({
      statusCode: HttpStatusCode.InternalServerError,
      message: "Internal Server Error!",
      data: null,
    });
  }
}
