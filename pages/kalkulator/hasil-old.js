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
          padding: "0",
        },
      }}
    >
      <div className="content-wrapper text-2xl p-2 center border-b border-black h-[50px]">
        Hasil perhitungan
      </div>
      <div
        className="content-wrapper relative overflow-y-auto !px-0 !py-4"
        id="modalResult"
        style={{ height: "calc(100% - 124px)" }}
      >
        {calcProduct.map((item, index) => (
          <ProductListItem key={index} model="nutrition" {...item.data[0]} />
        ))}
      </div>
      <div className="bg-carman-gray-10 p-4 w-full flex items-center justify-center h-[74px]">
        <Button onClick={close}>Close</Button>
      </div>
    </Modal>
  );
}
