import InputSearch from "../../components/Input/InputSearch";
import CoffeeCup from "../../public/CoffeeCup";
import CoffeeTime from "../../public/CoffeeTime";
import style from "./Cover.module.scss";

export default function HomepageCover() {
  return (
    <div className={`${style.cover} bg-secondary relative`}>
      <div className={`${style.textHead} mb-10`}>
        <h2 className="cm-font-heading2">
          <span className="text-primary">Cari</span> Informasi Kandungan{" "}
          <span className="text-primary">Manis</span>
        </h2>
        <h3 className="cm-font-medium">
          Temukan informasi kadar gula
          <br />
          dari minuman yang kamu konsumsi sehari-hari. Salam sehat!
        </h3>
      </div>
      <div
        className="absolute right-0"
        style={{ top: "50%", transform: "translate(-100%, -85%)" }}
      >
        <CoffeeCup />
      </div>
      <div
        className="absolute right-0"
        style={{ top: "50%", transform: "translate(-65%, -35%)" }}
      >
        <CoffeeTime />
      </div>
      <InputSearch />
    </div>
  );
}
