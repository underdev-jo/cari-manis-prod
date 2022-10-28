import { useEffect, useState } from "react";
import Alert from "../../components/Alert/Alert";
import { InputSearchDrink } from "../../components/Input/InputSearchDrink";
import Container from "../../components/Layout/Container";
import Spinner from "../../components/Spinner/Spinner";
import { get, ilike, ilikeilike } from "../../helpers/api";
import { DrinkListView } from "../home/DrinkList";
import PageHead from "../PageHead";
import FilterPackaging from "./FilterPackaging";
import FilterSugar from "./FilterSugar";

export async function getServerSideProps(context) {
  const { query } = context;
  return { props: { query } };
}

export default function SearchPage({ query }) {
  const [loading, setLoading] = useState(true);
  const [result, setRes] = useState(false);
  const [keyword, setKeyword] = useState();

  useEffect(() => {
    const search = async (name, kemasan) => {
      setLoading(true);

      let api = get;
      if (name && kemasan) api = ilikeilike;
      else if (name || kemasan) api = ilike;

      let bodyName = { column: "name", value: `%${name}%` };
      const bodyPack = { column: "packaging", value: kemasan };

      if (!name && kemasan)
        bodyName = { column: "packaging", value: `%${kemasan}%` };

      const res = await api("minuman", bodyName, bodyPack);

      setTimeout(() => {
        setRes(res);
        setLoading(false);
      }, 1000);
    };

    const keys = query.kemasan || query.q;
    setKeyword(query.q || "");
    if (keys) search(query.q, query.kemasan);
    else search("");
  }, [query]);

  let render = <Spinner />;
  if (!loading && result.data?.length > 0)
    render = <DrinkListView list={result.data} />;
  else if (!loading && (result.data?.length < 1 || result.length < 1))
    render = (
      <div className="my-6 text-center">
        <div className="text-3xl font-semibold mb-2">:(</div>
        <div className="text-lg">Yang kamu cari tidak ditemukan</div>
      </div>
    );
  else if (!loading && result.error)
    render = <Alert type="error" message={result.error?.message || "Error!"} />;

  return (
    <>
      <PageHead title={`Cari: ${keyword || "manis"}`} />
      <Container>
        <div className="relative">
          <div className="sticky top-[64.4px] bg-white p-2 z-50">
            <InputSearchDrink value={keyword} allowEmpty />
            <div className="-mx-2">
              <FilterSugar query={query} />
              <FilterPackaging query={query} />
            </div>
          </div>
          <div className="p-2">{render}</div>
        </div>
      </Container>
    </>
  );
}
