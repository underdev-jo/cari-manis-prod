import { useRouter } from "next/router";
import InputSearch from "./InputSearch";

export default function InputSearchDrink({ value = "", size, allowEmpty }) {
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

  return <InputSearch size={size} {...props} allowEmpty={allowEmpty} />;
}
