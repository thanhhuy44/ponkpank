import axios from "axios";

const request = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(function (config: any) {
  return config;
});

request.interceptors.response.use(
  (res) => {
    return res.data as any;
  },
  function (error) {
    console.error("🚀 ~ file: request.ts:23 ~ error:", error);
    return null;
  }
);

export default request;
