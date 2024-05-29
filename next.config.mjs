/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/apis/:path*",
        destination: "https://mlb24.theshow.com/apis/:path*", // Proxy to external API
      },
    ];
  },
  images: {
    domains: ["mlb24.theshow.com", "cards.theshow.com"],
  },
};

export default nextConfig;
