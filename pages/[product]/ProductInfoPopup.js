import { useEffect, useState } from "react";
import { runFunction } from "../../helpers/util";
import Close from "../../public/Close";

export default function ProductInfo({ isOpen = false, onClose }) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  let transform = "translate(0, 100%)";
  if (open) transform = "translate(0, 0%)";

  const close = () => runFunction(onClose, () => setOpen(false));

  return (
    <div
      className="fixed left-0 right-0 bottom-0"
      style={{
        transition: "0.25s ease-in-out",
        transform,
      }}
    >
      <div className="max-w-md mx-auto rounded-t-xl bg-white p-10 relative bg-primary-content">
        <div>Popup Content</div>
        <button
          className="absolute right-5 top-5 btn btn-sm btn-circle btn-error btn-outline"
          onClick={close}
        >
          <Close size={20} />
        </button>
      </div>
    </div>
  );
}
