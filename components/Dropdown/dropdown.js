import { runFunction } from "helpers/util";

import { useDispatch } from "react-redux";
import { setModalFilter } from "store/slices/modal-filter";

export default function SelectDropdown({
  list,
  text,
  onSelect,
  selected,
  title = "",
}) {
  const dispatch = useDispatch();

  const generateOptions = () => {
    return (
      <div>
        {list.map((item) => {
          const onClick = () => {
            runFunction(onSelect(item));
            doClose();
          };
          const isSelected = selected.value === item.value;
          return (
            <div key={item.value} className="flex items-center">
              <button
                onClick={onClick}
                className={`btn btn-ghost btn-sm normal-case font-normal flex-1 block my-1 hover:bg-primary-content ${
                  isSelected ? "bg-carman-blue-1 text-white" : ""
                }`}
              >
                {item.label}
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  function doOpen() {
    dispatch(setModalFilter({ modal: true, view: generateOptions(), title }));
    document.body.style.overflow = "hidden";
  }

  function doClose() {
    dispatch(setModalFilter({ modal: false, view: false, title: "" }));
    document.body.removeAttribute("style");
  }

  return (
    <button
      className="mx-2 btn btn-ghost min-w-[112px] text-left bg-transparent rounded-lg border border-carman-black-2 px-2 py-1 normal-case text-medium min-h-0 h-auto text-carman-black-2 font-normal hover:bg-slate-200 focus:border-carman-black-2 active:border-carman-black-2"
      onClick={doOpen}
    >
      {text}
    </button>
  );
}
