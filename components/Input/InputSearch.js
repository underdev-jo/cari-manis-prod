import { useEffect, useState } from "react";
import { isFunction, runFunction } from "../../helpers/util";
import IconSearch from "../../public/IconSearch";

export default function InputSearch({
  onSearch,
  placeholder = "Cari di sini",
  value = "",
}) {
  const [inputValue, setValue] = useState("");

  useEffect(() => {
    setValue(value);
  }, [value]);

  const clickSearch = (e) => {
    e.preventDefault();
    if (isFunction(onSearch)) onSearch(inputValue);
    else () => console.log("Searching: ", inputValue);
  };

  const onChange = (input) => {
    setValue(input.target.value || "");
  };

  return (
    <div className="relative">
      <form onSubmit={clickSearch}>
        <input
          className="rounded-lg py-3 px-4 border-2 input input-bordered border-[#E1E8F5] w-full bg-transparent focus:border-primary focus:ring-none"
          placeholder={placeholder}
          type="text"
          onChange={onChange}
          value={inputValue}
        />
        <button
          type="submit"
          className="btn btn-ghost no-animation absolute text-[#828282] active:bg-primary active:text-white"
          style={{ right: "0", top: "50%", transform: "translate(0, -50%)" }}
          onClick={clickSearch}
        >
          <IconSearch />
        </button>
      </form>
    </div>
  );
}
