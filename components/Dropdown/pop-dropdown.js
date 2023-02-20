import { runFunction } from "helpers/util";
import { useDispatch } from "react-redux";
import { setModalFilter } from "store/slices/modal-filter";

export default function PopDropdown({
  list,
  text,
  onSelect,
  selected = 0,
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
          const selectedItem = list[selected];
          const isSelected = selectedItem?.value === item.value || false;
          const selectedClass = isSelected ? "bg-carman-blue-1 text-white" : "";
          return (
            <div key={item.value} className="flex items-center">
              <button
                onClick={onClick}
                className={`btn btn-ghost btn-sm normal-case font-normal flex-1 block my-1 hover:bg-primary-content ${selectedClass}`}
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

  const isSelected = selected > 0;
  let borderColor = isSelected
    ? "border-carman-blue-1"
    : "border-carman-black-2";
  let textColor = isSelected ? "text-white" : "text-carman-black-2";
  let bgColor = isSelected ? "bg-carman-blue-1" : "bg-transparent";
  let hoverClass = isSelected
    ? "hover:bg-carman-blue-1 hover:text-white"
    : "hover:bg-blue-100 hover:text-carman-black-2";
  const actClass = `focus:${borderColor} active:${borderColor}`;
  const modelClass = `${bgColor} ${borderColor} ${textColor}`;
  const fixedClass = `btn btn-ghost min-w-[70px] text-left rounded-lg border px-2 py-1 normal-case text-medium min-h-0 h-auto font-normal hover:border-carman-blue-1`;
  const fullClass = `${fixedClass} ${modelClass} ${hoverClass} ${actClass}`;

  return (
    <button className={fullClass} onClick={doOpen}>
      {text}
    </button>
  );
}
