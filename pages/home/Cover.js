import { CoffeeCup, CoffeeTime } from "public/icons";
import { InputSearchDrink } from "components/Input/InputSearchDrink";
import style from "./Cover.module.scss";

export default function HomepageCover() {
  return (
    <div className={`${style.cover} bg-primary-content relative`}>
      <div className="max-w-sm mx-auto mb-10">
        <div className={style.textHead}>
          <h2 className="cm-heading h2">
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
      <div
        className="absolute right-0"
        style={{ top: "50%", transform: "translate(-55%, -85%)" }}
      >
        <CoffeeCup />
      </div>
      <div
        className="absolute right-0"
        style={{ top: "50%", transform: "translate(-35%, -35%)" }}
      >
        <CoffeeTime />
      </div>
      <InputSearchDrink />
    </div>
  );
}
