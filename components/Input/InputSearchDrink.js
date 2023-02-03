import { useRouter } from "next/router";
import InputSearch from "./InputSearch";

export default function InputSearchDrink({
  value = "",
  placeholder = "Cari produk minuman...",
  size,
  allowEmpty,
}) {
  const { push, replace } = useRouter();

  const onSearch = (keyword = "") => {
    const routing = value ? replace : push;
    routing(`/cari/?q=${keyword}`);
  };

  const props = { placeholder, value, onSearch };

  return <InputSearch size={size} {...props} allowEmpty={allowEmpty} />;
}
