import Button from "components/Button";
import ProductListItem from "components/Product/list-item";
import { getCookie } from "helpers/util";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setPopupCalculator } from "store/slices/calculatedPopup";

export default function PopupKalkulator() {
  const [counter, setCounter] = useState(0);

  const isOpen = useSelector(({ popupCalc }) => popupCalc.popup);
  const calcProduct =
    useSelector(({ calculatedProduct }) => calculatedProduct.product) || [];
  const dispatch = useDispatch();
  const close = () => dispatch(setPopupCalculator(false));

  const calculated = JSON.parse(getCookie("calculated") || "{}");

  console.log("Product: ", calcProduct);
  console.log("Calculated: ", calculated);

  let appEl = "";
  if (typeof window !== "undefined") {
    appEl = window.document.getElementById("__next");
    if (isOpen) window.document.body.style.overflow = "hidden";
    else window.document.body.style.overflow = "auto";
  }

  const defClass =
    "fixed z-50 bottom-0 left-0 right-0 w-screen h-screen bg-carman-gray-10 transition-all";
  const openClass = isOpen ? "opacity-100" : "opacity-0 pointer-events-none";
  const popClass = `${defClass} ${openClass}`;

  const defContent =
    "h-[86%] bg-white pt-[84px] rounded-b-2xl transition-all duration-300";
  const openContent = isOpen ? "translate-y-[0%]" : "translate-y-[-50%]";
  const contentClass = `${defContent}  ${openContent}`;

  const defBtn =
    "h-[14%] absolute bottom-0 left-0 right-0 flex items-center justify-center transition-all duration-150";
  const openBtn = isOpen ? "translate-y-[0%]" : "translate-y-[50%]";
  const btnClass = `${defBtn} ${openBtn}`;

  return (
    <div className={popClass}>
      <div className="relative h-[100%]">
        <div className={contentClass}>
          <div className="content-wrapper">
            <div className="px-2 text-heading3 text-carman-gray-2 border-b border-carman-gray-9 pb-3">
              Hasil Hitung Manismu
            </div>
          </div>

          <div className="content-wrapper h-[70%] overflow-y-auto overflow-x-hidden">
            <div className="px-2">
              <div className="mb-4">hehe</div>
              <div className="mb-4">hehe</div>
              <div className="mb-4">hehe</div>
              <div className="mb-4">hehe</div>
              <div className="mb-4">hehe</div>
              <div className="mb-4">hehe</div>
              <div className="mb-4">hehe</div>
              <div className="mb-4">hehe</div>
              <div className="mb-4">hehe</div>
              <div className="mb-4">hehe</div>
              <div className="mb-4">hehe</div>
              <div className="mb-4">hehe</div>
              <div className="mb-4">hehe</div>
              <div className="mb-4">hehe</div>
              <div className="mb-4">hehe</div>
              <div className="mb-4">hehe</div>
            </div>
          </div>
          <div className="content-wrapper">
            <div className="px-2 border-t border-carman-gray-9">
              <div className="flex items-start justify-between mt-4 mb-1">
                <div className="text-heading3 text-carman-gray-3">
                  Total Gula
                </div>
                <div>
                  <div className="text-heading4 text-carman-gray-3">60gr</div>
                </div>
              </div>
              <div className="flex items-start justify-between mb-4">
                <div className="text-heading3 text-carman-gray-3">
                  Total Kalori
                </div>
                <div>
                  <div className="text-heading4 text-carman-gray-3">
                    220kkal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={btnClass}>
          <div className="w-full max-w-xs mx-auto">
            <Button onClick={close} className="w-full">
              Tutup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
