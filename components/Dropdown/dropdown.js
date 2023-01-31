import ReactSelect from "react-select";
import { runFunction } from "helpers/util";
import style from "./dropdown.module.scss";

export default function SelectDropdown({ list, text, onSelect, id, selected }) {
  const changes = (target) => runFunction(onSelect(target));

  return (
    <ReactSelect
      value={selected}
      options={list}
      onChange={changes}
      instanceId={id}
      classNames={{
        control: () =>
          "!border !border-carman-black-2 text-small !rounded-lg !shadow-none w-[120px] mx-2 !bg-transparent !min-h-0 !h-auto",
        placeholder: () => "text-small !line-clamp-1",
        option: () => "!text-small",
        input: () => "!p-0 text-small",
        indicatorSeparator: () => "hidden",
        indicatorsContainer: () => "",
        dropdownIndicator: () => "!p-1",
      }}
      placeholder={text}
    />
  );
}
