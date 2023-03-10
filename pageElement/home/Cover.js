import SearchDrink from "components/Input/InputSearchDrink";
import CoffeeCup from "public/icons/CoffeeCup";
import CoffeeTime from "public/icons/CoffeeTime";
import style from "./Cover.module.scss";

const Cover = () => (
  <div className={style.cover}>
    <div className="max-w-sm mx-auto mb-10">
      <div className={style.textHead}>
        <h2 className="text-heading2">
          <span className="text-primary">Cari</span> Informasi Kandungan{" "}
          <span className="text-primary">Manis</span>
        </h2>
        <h3 className="text-small medium">
          Temukan informasi kadar gula
          <br />
          dari minuman yang kamu konsumsi sehari-hari. Salam manis!
        </h3>
      </div>
    </div>
    <div className={`${style.asset} ${style.one}`}>
      <CoffeeCup />
    </div>
    <div className={`${style.asset} ${style.two}`}>
      <CoffeeTime />
    </div>
    <SearchDrink placeholder="400+ produk cari manis, cari disini..." />
  </div>
);

export default Cover;
