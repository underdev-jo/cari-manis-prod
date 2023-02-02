import { useDispatch, useSelector } from "react-redux";
import { setModalFilter } from "store/slices/modal-filter";

export default function ModalOptionFilter({}) {
  const modal = useSelector((state) => state.modalFilter);
  const dispatch = useDispatch();

  const doClose = () => {
    dispatch(setModalFilter({ modal: false }));
    document.body.removeAttribute("style");
  };

  const isOpen = modal.modal;

  let classOverlay = "opacity-0 pointer-events-none";
  let classContent = "-translate-y-[70%] opacity-0 pointer-events-none";

  if (isOpen) {
    classOverlay = "opacity-70 z-50";
    classContent = "-translate-y-[50%] opacity-100 shadow-lg";
  }

  return (
    <>
      <div
        className={`fixed left-0 top-0 w-screen h-screen bg-primary-content transition-all duration-300 ${classOverlay}`}
        onClick={doClose}
      />
      <div
        className={`bg-white transition-all duration-300 rounded-2xl fixed left-[50%] top-[50%] -translate-x-[50%] w-9/12 max-w-xs z-50 overflow-hidden min-h-[220px] ${classContent}`}
      >
        <div className={`p-5 ${isOpen} text-center`}>
          <div className="text-heading4 pb-3 mb-3 border-b border-b-carman-gray-6">
            {modal.title || ""}
          </div>
          {modal.view}
        </div>
      </div>
    </>
  );
}
