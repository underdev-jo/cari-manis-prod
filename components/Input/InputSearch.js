import { isFunction } from "helpers/util";
import IconSearch from "public/icons/IconSearch";
import { useEffect, useState } from "react";
import style from "./input-search.module.scss";

export default function InputSearch({
  onSearch,
  placeholder = "Cari di sini",
  value = "",
  allowEmpty = false,
  size = "",
}) {
  const [inputValue, setValue] = useState(value);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const clickSearch = (e) => {
    const el = document.querySelector(":focus");
    if (el) el.blur();
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
          className={`${style["input-search"]} ${size && style[size]}`}
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
