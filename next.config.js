/** @type {import('next').NextConfig} */

const IS_DEV_ENV = process.env.NODE_ENV === "development";

const nextConfig = {
  // provide env info when .env file is missing
  env: {
    API_URL: IS_DEV_ENV ? process.env.DEV_API_URL : process.env.PROD_API_URL,
    RAWG: process.env.RAWG,
    GITHUB_PAT: process.env.GITHUB_PAT,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ["media.rawg.io"],
  },
};

module.exports = nextConfig;
