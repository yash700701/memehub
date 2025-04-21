import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com'],
  },
};

webpackDevMiddleware: config => {
  config.watchOptions.ignored = ['**/.git/**', '**/node_modules/**', '**/.next/**'];
  return config;
}


export default nextConfig;
