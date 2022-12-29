import InfoSymbol from "../Action/InfoSymbol";

export default function ModalPriceInfo() {
  const modalName = "modal-price-info";
  return (
    <div>
      <input type="checkbox" id={modalName} className="modal-toggle" />
      <label htmlFor={modalName} className="modal cursor-pointer">
        <label className="modal-box relative bg-white" htmlFor="">
          <div className="flex items-center">
            <InfoSymbol color="error" />
            <div className="ml-2 text-lg font-bold text-red-900">
              Prakiraan harga
            </div>
          </div>
          <p className="py-4">
            Harga yang tertera tidak mewakili harga jual sebenarnya.
          </p>
        </label>
      </label>
    </div>
  );
}
