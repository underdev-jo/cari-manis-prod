import { useState } from "react";

export default function ProductComment({ product }) {
  const [open, setOpen] = useState(false);

  const topClick = () => {
    if (!open) setOpen(true);
  };
  const close = (e) => {
    console.log("CLOSE--------");
    e.preventDefault();
    setOpen(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-2 text-xs">
      <div
        className={`relative max-w-md w-full mx-auto border-2 bg-neutral p-4 rounded-xl ${
          open ? "h-96" : "h-14 cursor-pointer"
        }`}
        style={{ transition: "0.35s ease-in-out" }}
        onClick={topClick}
      >
        <div className="flex items-center">
          <div className="badge badge-primary mr-2">10</div>
          <div className="text-white">Comments</div>
        </div>
        {open && (
          <button
            className="btn btn-error btn-sm btn-circle absolute right-[10px] top-[10px]"
            onClick={close}
          >
            X
          </button>
        )}
      </div>
    </div>
  );
}
