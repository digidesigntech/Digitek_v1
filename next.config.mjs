/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@splinetool/react-spline", "@splinetool/runtime"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    minimumCacheTTL: 60,
  },
  webpack: (config) => {
    // Spline ships pure ESM with only the `import` condition in its exports map.
    // Force webpack to honor `import` first so server-side resolution succeeds.
    config.resolve.conditionNames = [
      "import",
      ...(config.resolve.conditionNames || []),
    ];
    return config;
  },
};

export default nextConfig;
