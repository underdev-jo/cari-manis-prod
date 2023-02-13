import Head from "next/head";

export default function PageHead({
  title = "cari-manis.id",
  description = "Cari tahu seberapa manis minumanmu",
  image = "/legal/thumbnail-carimanis-med.jpg",
  url = "https://cari-manis.my.id",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Cari Manis" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />

      <link rel="icon" href="/favicon-cari-manis.png" />
    </Head>
  );
}
