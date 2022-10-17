import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Alert from "../../components/Alert/Alert";
import Container from "../../components/Layout/Container";
import Spinner from "../../components/Spinner/Spinner";
import { get, ilike, ilikeEq } from "../../helpers/api";
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
      let api = get;
      if (name && kemasan) api = ilikeEq;
      else if (name || kemasan) api = ilike;

      setLoading(true);

      let bodyName = { column: "name", value: `%${name}%` };
      const bodyPack = { column: "packaging", value: kemasan };

      if (!name && kemasan)
        bodyName = { column: "packaging", value: `%${kemasan}%` };

      const res = await api("minuman", bodyName, bodyPack);

      setRes(res);
      setLoading(false);
    };

    const keys = query.kemasan || query.q;

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
            <SearchDrink value={keyword} allowEmpty />
            <FilterPackaging />
          </div>
          <div className="p-2">{render}</div>
        </div>
      </Container>
    </>
  );
}
