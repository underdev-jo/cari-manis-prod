import Button from "components/Button";
import ProductListItem from "components/Product/list-item";
import { getCookie } from "helpers/util";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setPopupCalculator } from "store/slices/calculatedPopup";

export default function PopupKalkulator() {
  const isOpen = useSelector(({ popupCalc }) => popupCalc.popup);
  const calcProduct =
    useSelector(({ calculatedProduct }) => calculatedProduct.product) || [];
  const dispatch = useDispatch();
  const close = () => dispatch(setPopupCalculator(false));

  const calculated = JSON.parse(getCookie("calculated") || "{}");

  let appEl = "";
  if (typeof window !== "undefined") {
    appEl = window.document.getElementById("__next");
    if (isOpen) window.document.body.style.overflow = "hidden";
    else window.document.body.style.overflow = "auto";
  }

  console.log("Hasil: ", calculated);

  return (
    <Modal
      appElement={appEl}
      isOpen={isOpen}
      style={{
        overlay: {
          zIndex: "999",
        },
        content: {
          border: "none",
          width: "100%",
          height: "100%",
          left: "0",
          top: "0",
          borderRadius: "0",
          overflow: "hidden",
          position: "relative",
        },
      }}
    >
      <Button className="absolute right-0 top-0" onClick={close}>
        Close
      </Button>
      <div
        className="content-wrapper relative overflow-y-auto max-h-full border border-red-100"
        id="modalResult"
      >
        {calcProduct.map((item, index) => (
          <ProductListItem key={index} {...item.data[0]} />
        ))}
        <h2 className="text-4xl">ehheheheheh</h2>
        <h2 className="text-4xl">ehheheheheh</h2>
        <h2 className="text-4xl">ehheheheheh</h2>
        <h2 className="text-4xl">ehheheheheh</h2>
        <h2 className="text-4xl">ehheheheheh</h2>
        <h2 className="text-4xl">ehheheheheh</h2>
        <h2 className="text-4xl">ehheheheheh</h2>
        <h2 className="text-4xl">ehheheheheh</h2>
        <h2 className="text-4xl">ehheheheheh</h2>
        <h2 className="text-4xl">ehheheheheh</h2>
        <h2 className="text-4xl">ehheheheheh</h2>
        <h2 className="text-4xl">ehheheheheh</h2>
        <h2 className="text-4xl">ehheheheheh</h2>
        <h2 className="text-4xl">ehheheheheh</h2>
        <h2 className="text-4xl">ehheheheheh</h2>
        <h2 className="text-4xl">ehheheheheh</h2>
        <h2 className="text-4xl">ehheheheheh</h2>
        <h2 className="text-4xl">ehheheheheh</h2>
        <h2 className="text-4xl">ehheheheheh</h2>
      </div>
    </Modal>
  );
}
