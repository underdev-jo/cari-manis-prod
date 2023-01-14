import Button from "components/Button";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setPopupCalculator } from "store/slices/popupCalc";

export default function PopupKalkulator({}) {
  const isOpen = useSelector(({ popupCalc }) => popupCalc.popup);

  console.log({ isOpen });

  const dispatch = useDispatch();
  const close = () => dispatch(setPopupCalculator(false));

  let appEl = "";
  if (typeof window !== "undefined")
    appEl = window.document.getElementById("__next");
  return (
    <Modal
      appElement={appEl}
      isOpen={isOpen}
      style={{
        overlay: {
          zIndex: "999",
        },
      }}
    >
      <div id="modalResult">
        <Button onClick={close}>Close</Button>
        <h2 className="text-4xl">ehheheheheh</h2>
      </div>
    </Modal>
  );
}
