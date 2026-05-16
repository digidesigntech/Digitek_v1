/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@splinetool/react-spline", "@splinetool/runtime"],
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
