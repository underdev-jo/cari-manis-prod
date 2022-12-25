import { useEffect, useState } from "react";
import Alert from "components/Alert/Alert";
import { InputSearchDrink } from "components/Input/InputSearchDrink";
import Container from "components/Layout/Container";
import Spinner from "components/Spinner/Spinner";
import ErrorLayout from "layouts/Error";
import {
  get,
  ilike,
  ilike2,
  ilike2lte,
  ilikelte,
  lte,
} from "../../helpers/api";
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
    const search = async (name, kemasan, gula) => {
      setLoading(true);

      let api = get;

      let colName = { column: "name", value: `%${name}%` };
      const colPackage = { column: "packaging", value: `%${kemasan}%` };
      const colGula = { column: "gula", value: gula };

      let col1 = false;
      let col2 = false;
      let col3 = false;

      if (name && kemasan) {
        api = ilike2;
        col1 = colName;
        col2 = colPackage;
        if (gula) {
          api = gula > 50 ? i : ilike2lte;
          col3 = colGula;
        }
      } else if (!name && kemasan) {
        api = ilike;
        col1 = colPackage;
        if (gula) {
          api = gula > 50 ? i : ilikelte;
          col2 = colGula;
        }
      } else if (name && !kemasan) {
        api = ilike;
        col1 = colName;
        if (gula) {
          api = gula > 50 ? i : ilikelte;
          col2 = colGula;
        }
      } else {
        api = get;
        if (gula) {
          api = gula > 50 ? i : lte;
          col1 = colGula;
        }
      }

      const res = await api("minuman", col1, col2, col3);

      setTimeout(() => {
        setRes(res);
        setLoading(false);
      }, 1000);
    };

    const keys = query?.kemasan || query.q;
    setKeyword(query.q || "");
    if (keys) search(query.q, query?.kemasan, query.gula);
    else search("");
  }, [query]);

  let render = <Spinner />;
  if (!loading && result.data?.length > 0)
    render = <DrinkListView list={result.data} />;
  else if (!loading && (result.data?.length < 1 || result.length < 1))
    render = (
      <ErrorLayout
        title="Yah, yang kamu cari gaada :("
        imagePath="/faces/sad-face.svg"
      />
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
