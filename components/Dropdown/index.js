import { runFunction } from "helpers/util";
import { useEffect, useState } from "react";
import ChevronDown from "components/icons/chevron-down";

export default function Dropdown({
  list = [],
  onSelect,
  text = "Dropdown",
  selected,
  isOpen,
  children,
}) {
  const [open, setOpen] = useState(isOpen);

  const toggle = () => setOpen(!open);
  const close = () => setTimeout(setOpen, 150, false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <div className="relative mx-2 z-50">
      <button
        onClick={toggle}
        onBlur={close}
        className="btn bg-transparent rounded-lg flex items-center border-carman-black-2 px-2 py-1 normal-case !min-h-0 !h-auto
       text-medium text-carman-black-2 font-normal
       hover:bg-slate-200"
      >
        <div className="line-clamp-1 flex-1">{children || text}</div>
        <div className="ml-1">
          <ChevronDown />
        </div>
      </button>
      {open && (
        <div className="absolute top-[100%] left-0 p-2 shadow-xl bg-base-100 rounded-box w-52">
          {list.map((item, index) => {
            const key = item.key || item || index;
            const display = item.value || item.label || key;
            const click = () => runFunction(onSelect(item));
            const isSelected =
              selected === item.value ||
              selected === item.key ||
              selected === item ||
              selected === index;
            return (
              <button
                className={`btn bg-transparent min-h-0 h-auto block w-full border-none normal-case text-carman-black-2 rounded-xl text-left text-xs hover:bg-slate-100 py-2 px-4 line-clamp-1 ${
                  isSelected ? "bg-slate-100" : ""
                }`}
                key={key}
                onClick={click}
                disabled={isSelected}
              >
                {display}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
