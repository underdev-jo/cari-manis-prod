import { useDispatch, useSelector } from "react-redux";
import { setModalFilter } from "store/slices/modal-filter";

export default function ModalOptionFilter() {
  const modal = useSelector((state) => state.modalFilter);
  const dispatch = useDispatch();

  const doClose = () => {
    dispatch(setModalFilter({ modal: false }));
    document.body.removeAttribute("style");
  };

  const isOpen = modal.modal;

  let classOverlay = "opacity-0 pointer-events-none";
  let classContent = "-translate-y-[70%] opacity-0 pointer-events-none h-0";

  if (isOpen) {
    classOverlay = "opacity-50 z-50";
    classContent = "-translate-y-[50%] opacity-100 shadow-lg h-auto";
  }

  return (
    <>
      <div
        className={`fixed left-0 top-0 w-screen h-screen bg-primary-content transition-all ${classOverlay}`}
        onClick={doClose}
      />
      <div
        className={`bg-white transition-all rounded-xl fixed left-[50%] top-[50%] -translate-x-[50%] w-9/12 max-w-xs z-50 overflow-hidden ${classContent}`}
      >
        <div className={`p-4 ${isOpen}`}>
          View:
          {modal.view}
        </div>
      </div>
    </>
  );
}
