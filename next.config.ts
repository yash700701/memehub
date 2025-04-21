// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ['res.cloudinary.com'],
//   },
// };

// webpackDevMiddleware: config => {
//   config.watchOptions.ignored = ['**/.git/**', '**/node_modules/**', '**/.next/**'];
//   return config;
// }


// export default nextConfig;


import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpackDevMiddleware: (config: Configuration & { watchOptions?: any }) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/.git/**', '**/node_modules/**', '**/.next/**'],
    };
    return config;
  },
};

export default nextConfig;
