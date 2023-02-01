import { runFunction } from "helpers/util";
import style from "./dropdown.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setModalFilter } from "store/slices/modal-filter";

export default function SelectDropdown({ list, text, onSelect, id, selected }) {
  const modal = useSelector((state) => state.modalFilter);
  const dispatch = useDispatch();

  const open = modal.modal;

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
                className={`btn btn-ghost btn-sm normal-case font-normal flex-1 text-left block my-1 hover:bg-primary-content ${
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
    dispatch(setModalFilter({ modal: true, view: generateOptions() }));
    document.body.style.overflow = "hidden";
  }

  function doClose() {
    dispatch(setModalFilter({ modal: false, view: false }));
    document.body.removeAttribute("style");
  }

  function doToggle() {
    if (open) doClose();
    else doOpen();
  }

  return (
    <div className="mx-2">
      <button className={style.carmanDropdown} onClick={doToggle}>
        {text}
      </button>
    </div>
  );
}
