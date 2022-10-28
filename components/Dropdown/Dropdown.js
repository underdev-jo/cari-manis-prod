import { useState } from "react";
import { isFunction } from "../../helpers/util";

import Button from "../Button/Button";

export default function Dropdown({
  list = [],
  onSelect,
  text = "Dropdown",
  size = "sm",
  selected,
}) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);
  const close = () => setTimeout(setOpen, 150, false);

  const sizeClass = {
    xs: "btn-xs",
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  const btnClass = `${sizeClass[size]} normal-case`;

  return (
    <div className="relative inline-block">
      <Button onClick={toggle} onBlur={close} outline className={btnClass}>
        {text}
      </Button>
      {open && (
        <div className="absolute top-[100%] left-0 p-2 shadow bg-base-100 rounded-box w-52">
          {list.map((item, index) => {
            const display =
              item.value || item.label || item.key || item || index;
            const isSelect = selected === (item.key || item);
            return (
              <Button
                key={item.key || item || index}
                onClick={(e) => {
                  e.preventDefault();
                  if (isFunction(onSelect)) onSelect(item);
                  else console.log("Selecting: ", item);
                  close();
                }}
                disabled={isSelect}
                model="ghost"
                className="block w-full text-left m-0 btn-sm"
              >
                {display}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
