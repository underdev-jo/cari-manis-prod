import { runFunction } from "helpers/util";
import style from "./dropdown.module.scss";

export default function SelectDropdown({ list, text, onSelect, id }) {
  const changes = (e) => {
    const target = list[e.target.options.selectedIndex - 1];
    runFunction(onSelect(target));
  };

  return (
    <select className={style.carmanDropdown} onChange={changes}>
      <option disabled>{text}</option>
      {list.map((item) => {
        const key = item.key || item || index;
        const display = item.value || item.label || key;
        const click = () => runFunction(onSelect(item));
        return (
          <option key={key} value={item.value} onClick={click}>
            {display}
          </option>
        );
      })}
    </select>
  );
}
