/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: "http://localhost:3000/api",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**/*",
      },
    ],
  },
};

export default nextConfig;
