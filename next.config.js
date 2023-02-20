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
      "lzd-img-global.slatic.net",
      "cdn.shopify.com",
      "cf.shopee.co.id",
    ],
  },
};

module.exports = nextConfig;
