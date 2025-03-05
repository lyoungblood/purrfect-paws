import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Pre-compile all pages at build time
  output: 'export', // Enables static HTML export
  // Enable static generation for all pages
  staticPageGenerationTimeout: 180, // Increase timeout for static generation (in seconds)
  // Optimize images
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
