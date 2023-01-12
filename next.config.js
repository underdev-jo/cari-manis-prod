/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "placeimg.com",
      "obqyrahgipvmnyfejdvl.supabase.co",
      "via.placeholder.com",
    ],
  },
};

module.exports = nextConfig;
