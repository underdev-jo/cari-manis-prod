import InputSearchDrink from "components/Input/InputSearchDrink";
import { useEffect, useState } from "react";
import FilterPackaging from "./filter-packaging";
import FilterSugar from "./filter-sugar";
import style from "./product-search.module.scss";

export async function getServerSideProps(context) {
  const { query } = context;
  return { props: { query } };
}

let lastScroll = 0;

export default function ProductSearch({ keyword, query }) {
  const [scrollDir, setScrolldir] = useState("up");

  useEffect(() => {
    const fn = () => {
      const posY = parseInt(window.pageYOffset, 10);
      if (posY >= lastScroll) setScrolldir("down");
      else setScrolldir("up");
      console.log({ posY, lastScroll });
      lastScroll = posY <= 0 ? 0 : posY;
    };

    window.addEventListener("scroll", fn);

    return () => {
      window.removeEventListener("scroll", fn);
    };
  }, []);

  const classUp = style.shown;

  return (
    <div className={`${style["product-search"]} ${style[scrollDir]}`}>
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
