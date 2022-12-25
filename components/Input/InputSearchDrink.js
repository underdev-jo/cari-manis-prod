import { useRouter } from "next/router";
import InputSearch from "./InputSearch";

export function InputSearchDrink({ value = "", allowEmpty }) {
  const { push, replace } = useRouter();

  const onSearch = (keyword = "") => {
    const routing = value ? replace : push;
    routing(`/cari/?q=${keyword}`);
  };

  const props = {
    placeholder: "Cari produk minuman...",
    value,
    onSearch,
  };

  return <InputSearch {...props} allowEmpty={allowEmpty} />;
}
