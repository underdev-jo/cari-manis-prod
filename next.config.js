/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["placeimg.com", "obqyrahgipvmnyfejdvl.supabase.co"],
  },
};

module.exports = nextConfig;
