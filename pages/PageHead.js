import { baseUrl } from "helpers/util";
import Head from "next/head";

export default function PageHead({
  title = "cari-manis.id",
  description = "Cari tahu seberapa manis minumanmu",
  image = `${baseUrl}/legal/thumbnail-carimanis-med.jpg`,
  url = "https://cari-manis.my.id",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      <link rel="icon" href="/favicon-cari-manis.png" />
    </Head>
  );
}
