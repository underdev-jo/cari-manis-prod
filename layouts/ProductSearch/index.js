import { useEffect, useState } from "react";
import InputSearchDrink from "components/Input/InputSearchDrink";
import FilterPackaging from "./filter-packaging";
import FilterSugar from "./filter-sugar";
import style from "./product-search.module.scss";
import FilterSort from "./filter-sort";
import FilterType from "./filter-type";

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
      if (posY > lastScroll) {
        setScrolldir("down");
        const el = document.querySelector(":focus");
        if (el) el.blur();
      } else setScrolldir("up");
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
          <FilterSugar />
          <FilterPackaging />
          <FilterSort />
          <FilterType />
        </div>
      </div>
    </div>
  );
}
