import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Container from "../../components/Layout/Container";
import Spinner from "../../components/Spinner/Spinner";
import { apiSearch, apiSearchEq } from "../../helpers/util";
import { SearchDrink } from "../home/Cover";
import { DrinkListView } from "../home/DrinkList";
import PageHead from "../PageHead";
import FilterPackaging from "./FilterPackaging";

export default function SearchPage() {
  const [loading, setLoading] = useState(true);
  const [result, setRes] = useState(false);

  const router = useRouter();
  const { query } = router;

  const keyword = query.q || query.kemasan || "";

  useEffect(() => {
    const search = async (name, kemasan) => {
      console.log("Searching: ", name, kemasan);
      setLoading(true);
      const ilike = { column: "name", value: `%${name}%` };
      const eq = { column: "packaging", value: kemasan };
      const api = kemasan ? apiSearchEq : apiSearch;
      const res = await api("minuman", ilike, eq);
      setRes(res);
      setLoading(false);
    };

    const keys = query.kemasan || query.q;

    if (keys) search(query.q, query.kemasan);
  }, [query]);

  let render = <Spinner />;
  if (!loading && result.data.length > 0)
    render = <DrinkListView list={result.data} />;
  else if (!loading && (result.data.length < 1 || result.length < 1))
    render = (
      <div className="my-6 text-center">
        <div className="text-3xl font-semibold mb-2">:(</div>
        <div className="text-lg">Yang kamu cari tidak ditemukan</div>
      </div>
    );

  return (
    <>
      <PageHead title={`Cari: ${keyword || "manis"}`} />
      <Container>
        <div className="relative">
          <div className="sticky top-[64.4px] bg-white p-2 z-50">
            <SearchDrink value={keyword} />
            <FilterPackaging />
          </div>
          <div className="p-2">{render}</div>
        </div>
      </Container>
    </>
  );
}
