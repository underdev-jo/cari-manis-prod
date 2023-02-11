/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "placeimg.com",
      "obqyrahgipvmnyfejdvl.supabase.co",
      "via.placeholder.com",
      "https://fonts.gstatic.com",
      "assets.klikindomaret.com",
      "media.monotaro.id",
      "images.tokopedia.net",
    ],
  },
};

module.exports = nextConfig;
