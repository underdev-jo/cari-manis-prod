import { runFunction } from "helpers/util";
import { Close } from "public/icons";
import { useEffect, useState } from "react";
import style from "./product-info-popup.module.scss";

export default function ProductInfo({ isOpen = false, onClose }) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const close = () => runFunction(onClose, () => setOpen(false));

  return (
    <div className={`${style.popup} ${open ? style.open : ""}`}>
      <div className={style.content}>
        <div>Popup Content</div>
        <button className={style.btnClose} onClick={close}>
          <Close size={20} />
        </button>
      </div>
    </div>
  );
}
