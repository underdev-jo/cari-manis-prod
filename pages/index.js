import { baseUrl } from "helpers/util";
import dynamic from "next/dynamic";
import { Cover, DrinkCategory, SweetInfo } from "pageElement/home";
import PageHead from "pages/PageHead";

const DynamicSection = dynamic(() => import("./minuman-berkategori"), {
  loading: (
    <div className="bg-carman-blue-0 h-screen">
      <div className="text-2xl animate-bounce">...</div>
    </div>
  ),
});

export async function getStaticProps() {
  let fetching = await fetch(`${baseUrl}/api/home-content`);
  const filtered = fetching ? await fetching.json() : null;

  return {
    props: { filtered },
    revalidate: 3600,
  };
}

export default function Home({ filtered }) {
  return (
    <>
      <PageHead title="Cari Manis" />
      <div className="container">
        <Cover />
        <DrinkCategory />
        <SweetInfo />
        <DynamicSection filtered={filtered} />
      </div>
    </>
  );
}
