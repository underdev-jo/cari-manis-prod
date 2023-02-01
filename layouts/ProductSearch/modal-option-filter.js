import { useDispatch, useSelector } from "react-redux";
import { setModalFilter } from "store/slices/modal-filter";

export default function ModalOptionFilter() {
  const modal = useSelector((state) => state.modalFilter);
  const dispatch = useDispatch();
  const doClose = () => {
    dispatch(setModalFilter({ modal: false }));
    document.body.removeAttribute("style");
  };
  return (
    <>
      <div
        className={`fixed left-0 top-0 w-screen h-screen bg-primary-content transition-all ${
          modal.modal ? "opacity-50 z-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={doClose}
      />
      <div
        className={`bg-white transition-all rounded-xl fixed left-[50%] top-[50%] -translate-x-[50%] w-9/12 max-w-xs ${
          modal.modal
            ? "-translate-y-[50%] opacity-100 shadow-lg"
            : "-translate-y-[70%] opacity-0"
        } z-50`}
      >
        <div className="p-4">
          View:
          {modal.view}
        </div>
      </div>
    </>
  );
}
