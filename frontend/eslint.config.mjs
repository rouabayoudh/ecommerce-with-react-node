/** @type {import('next').NextConfig} */
const apiUrl = process.env.NEXT_PUBLIC_API_ORIGIN || "http://localhost:4000/";
const url = new URL(apiUrl);
const nextConfig = {
  publicRuntimeConfig: {
    apiUrl,
    ssoEnabled: process.env.NEXT_PUBLIC_SSO_ENABLED === "true",
    lang: {
      default: "en",
    },
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: url.hostname,
        port: url.port,
        pathname: "/attachment/**",
      },
      {
        protocol: "http",
        hostname: url.hostname,
        port: url.port,
        pathname: "/attachment/**",
      },
    ],
  },
};

export default nextConfig;
