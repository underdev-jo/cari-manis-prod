import Button from "components/Button";
import { getCookie } from "helpers/util";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopupCalculator } from "store/slices/calculatedPopup";
import PopupKalkulator from "./hasil-produk";
import HasilInfo from "./hasil-info";

export default function PopupHasil() {
  const [detail, setDetail] = useState(false);

  const calculated = JSON.parse(getCookie("calculated") || "{}");

  const isOpen = useSelector(({ popupCalc }) => popupCalc.popup);
  const calcProduct =
    useSelector(({ calculatedProduct }) => calculatedProduct.product) || [];

  const dispatch = useDispatch();
  const close = () => {
    setDetail(false);
    setTimeout(() => dispatch(setPopupCalculator(false)), 400);
  };

  const openDetail = () => setDetail(!detail);

  let total = { sugar: 0, calorie: 0 };
  if (calcProduct && calcProduct.length) {
    calcProduct.map((item) => {
      total.sugar = total.sugar + item.data[0].xSug;
      total.calorie = total.calorie + item.data[0].xCal;
    });
  }

  const limiter = (num, max) => parseInt((num / max) * 100, 10);

  const limit = {
    sugar: limiter(total.sugar, 50),
    calorie: limiter(total.calorie, 2100),
  };

  let hei = "h-[40vh]";
  let posTop = "top-[50%] !w-[80%]";
  let overpacity = "opacity-70";
  if (detail) {
    hei = "h-[87%]";
    posTop = "top-[0%] !translate-y-0 rounded-t-none !w-screen";
    overpacity = "opacity-100";
  }

  let appEl = "";
  if (typeof window !== "undefined") {
    appEl = window.document.getElementById("__next");
    if (isOpen) window.document.body.style.overflow = "hidden";
    else window.document.body.style.overflow = "auto";
  }

  const defOverlay =
    "fixed left-0 top-0 h-screen w-screen bg-primary-content transition-all duration-300 z-50";
  const openOverlay = isOpen ? overpacity : "opacity-0 pointer-events-none";
  const classOverlay = `${defOverlay} ${openOverlay}`;

  const defModal =
    "fixed left-[50%] w-[80%] max-w-md rounded-2xl bg-white shadow-lg transition-all duration-300 -translate-x-[50%] -translate-y-[50%] z-50";
  const openModal = isOpen
    ? `${posTop} ${hei} opacity-100`
    : "top-[70%] opacity-0 pointer-events-none";
  const classModal = `${defModal} ${openModal}`;

  const defBtn =
    "h-[14%] fixed bottom-0 left-0 right-0 flex items-center justify-center transition-all duration-150 z-50";
  const openBtn = isOpen && detail ? "translate-y-[0%]" : "translate-y-[200%]";
  const btnClass = `${defBtn} ${openBtn}`;

  return (
    <>
      <div className={classOverlay} />
      <div className={classModal}>
        <div className="relative h-full">
          <HasilInfo
            detail={detail}
            total={total}
            limit={limit}
            clickDetail={openDetail}
            close={close}
          />
          {detail && (
            <PopupKalkulator
              detail={detail}
              total={total}
              limit={limit}
              calcProduct={calcProduct}
            />
          )}
        </div>
      </div>
      <div className={btnClass}>
        <div className="w-full max-w-xs mx-auto">
          <Button onClick={close} className="w-full">
            Tutup
          </Button>
        </div>
      </div>
    </>
  );
}
