import { isFunction } from "helpers/util";
import Button from "components/Button";
import { useEffect, useState } from "react";

export default function Dropdown({
  list = [],
  onSelect,
  text = "Dropdown",
  size = "sm",
  selected,
  isOpen,
  children,
  className = "",
  color = "primary",
}) {
  const [open, setOpen] = useState(isOpen);

  const toggle = () => setOpen(!open);
  const close = () => setTimeout(setOpen, 150, false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const sizeClass = {
    xs: "btn-xs",
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  const btnClass = `${sizeClass[size]} normal-case ${className} btn-${color}`;

  return (
    <div className="relative inline-block z-50">
      <Button onClick={toggle} onBlur={close} outline className={btnClass}>
        {children || text}
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
                className="block w-full text-left m-0 btn-sm mb-2 last:mb-[0px]"
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
