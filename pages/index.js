import ContentLoading from "components/Loading/content";
import { baseUrl } from "helpers/util";
import dynamic from "next/dynamic";
import Cover from "pageElement/home/Cover";
import DrinkCategory from "pageElement/home/DrinkCategory";
import SweetInfo from "pageElement/home/SweetInfo";
import PageHead from "pages/PageHead";

const DynamicSection = dynamic(() => import("./minuman-berkategori"), {
  loading: () => <ContentLoading />,
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
