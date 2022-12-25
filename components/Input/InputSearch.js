import { isFunction } from "helpers/util";
import { IconSearch } from "public/icons";
import { useEffect, useState } from "react";
import style from "./input-search.module.scss";

export default function InputSearch({
  onSearch,
  placeholder = "Cari di sini",
  value = "",
  allowEmpty = false,
}) {
  const [inputValue, setValue] = useState("");

  useEffect(() => {
    setValue(value);
  }, [value]);

  const clickSearch = (e) => {
    e.preventDefault();
    if (isFunction(onSearch)) {
      if (inputValue) onSearch(inputValue);
      else if (allowEmpty) onSearch(inputValue);
    } else () => console.log("Searching: ", inputValue);
  };

  const onChange = (input) => {
    setValue(input.target.value || "");
  };

  return (
    <div className={style["input-search-group"]}>
      <form onSubmit={clickSearch}>
        <input
          className={`${style["input-search"]} ${style["small"]}`}
          placeholder={placeholder}
          type="text"
          onChange={onChange}
          value={inputValue}
        />
        <button type="submit" className={style["button-search"]}>
          <IconSearch />
        </button>
      </form>
    </div>
  );
}
