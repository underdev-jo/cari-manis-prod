import { useRouter } from "next/router";
import InputSearch from "../../components/Input/InputSearch";
import CoffeeCup from "../../public/CoffeeCup";
import CoffeeTime from "../../public/CoffeeTime";
import style from "../../styles/homepage/Cover.module.scss";

export function SearchDrink({ value = "", allowEmpty }) {
  const { push, replace } = useRouter();

  const onSearch = (keyword) => {
    const routing = value ? replace : push;

    if (keyword) {
      console.log("Searching: ", keyword);
      routing(`/search/?q=${keyword}`);
    } else routing(`/search/?q=`);
  };

  const props = {
    placeholder: "Cari produk minuman...",
    value,
    onSearch,
  };

  return <InputSearch {...props} allowEmpty={allowEmpty} />;
}

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
      <SearchDrink />
    </div>
  );
}
