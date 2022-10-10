import Head from "next/head";

export default function PageHead({
  title = "cari-manis.id",
  description = "Cari tahu seberapa manis minumanmu",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
