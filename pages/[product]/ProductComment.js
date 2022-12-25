import { useState } from "react";
import { diffDate } from "helpers/util";
import { Close } from "public/icons";

const CommentItem = ({ comment = "", created_at = "" }) => {
  const [open, setOpen] = useState(false);

  const line = open ? "" : "line-clamp-2";

  const toggle = () => setOpen(!open);

  const timeView = diffDate(created_at);

  return (
    <div className="py-4 px-6" style={{ transition: "0.25s ease-in-out" }}>
      <div className={`mb-2 text-sm text-white ${line}`} onClick={toggle}>
        {comment}
      </div>
      <div className="text-xs">{timeView}</div>
    </div>
  );
};

export default function ProductComment({ comment }) {
  const [open, setOpen] = useState(false);

  const topClick = () => {
    if (!open && comment.count > 0) setOpen(true);
  };

  const close = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-2 text-xs">
      <div
        className={`relative max-w-md w-full mx-auto border-2 bg-neutral rounded-xl ${
          open ? "h-96" : "h-14 cursor-pointer"
        }`}
        style={{ transition: "0.25s ease-in-out" }}
        onClick={topClick}
      >
        <div className="flex items-center p-4">
          <div className="badge badge-primary mr-2">
            {(comment && comment.count) || 0}
          </div>
          <div className="text-white">Komentar</div>
        </div>
        <div className="h-60 overflow-y-auto mt-2">
          {comment &&
            comment.data.map((comm) => <CommentItem key={comm.id} {...comm} />)}
        </div>
        <button
          className="btn btn-error btn-sm btn-circle absolute right-[10px] top-[10px]"
          style={{
            transition: "0.25s ease-in-out",
            transform: `scale(${open ? 1 : 0})`,
          }}
          onClick={close}
        >
          <Close size={20} />
        </button>
      </div>
    </div>
  );
}
