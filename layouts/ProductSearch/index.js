import InputSearchDrink from "components/Input/InputSearchDrink";
import FilterPackaging from "./filter-packaging";
import FilterSugar from "./filter-sugar";
import style from "./product-search.module.scss";

export async function getServerSideProps(context) {
  const { query } = context;
  return { props: { query } };
}

export default function ProductSearch({ keyword, query }) {
  return (
    <div className={style["product-search"]}>
      <div className={style.inner}>
        <InputSearchDrink size="small" value={keyword} allowEmpty />
        <div className={style["filter-group"]}>
          <FilterSugar query={query} />
          <FilterPackaging query={query} />
        </div>
      </div>
    </div>
  );
}
