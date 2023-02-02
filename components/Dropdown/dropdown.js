import { runFunction } from "helpers/util";
import { useDispatch } from "react-redux";
import { setModalFilter } from "store/slices/modal-filter";

export default function SelectDropdown({
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
          const isSelected = selectedItem.value === item.value;
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
  let textColor = isSelected ? "text-carman-blue-1" : "text-carman-black-2";
  let bgColor = isSelected ? "bg-primary-content" : "bg-slate-200";

  return (
    <button
      className={`mx-2 btn btn-ghost min-w-[112px] text-left bg-transparent rounded-lg border ${borderColor} ${textColor} px-2 py-1 normal-case text-medium min-h-0 h-auto font-normal hover:${borderColor} hover:${bgColor} hover:${textColor} focus:${borderColor} active:${borderColor}`}
      onClick={doOpen}
    >
      {text}
    </button>
  );
}
