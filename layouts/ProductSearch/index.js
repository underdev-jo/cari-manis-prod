import InputSearchDrink from "components/Input/InputSearchDrink";
import useScrollDirection from "customHooks/useScrollDirection";
import FilterPackaging from "./filter-packaging";
import FilterSugar from "./filter-sugar";
import style from "./product-search.module.scss";

let lastScroll = 0;

export async function getServerSideProps(context) {
  const { query } = context;
  return { props: { query } };
}

export default function ProductSearch({ keyword, query }) {
  const direction = useScrollDirection();
  const classUp = direction === "down" ? style.hide : style.shown;

  return (
    <div className={style["product-search"]}>
      <div className={style.inner}>
        <div className="z-50">
          <InputSearchDrink size="small" value={keyword} allowEmpty />
        </div>
        <div className={`${style["filter-group"]} ${classUp}`}>
          <FilterSugar query={query} />
          <FilterPackaging query={query} />
        </div>
      </div>
    </div>
  );
}
