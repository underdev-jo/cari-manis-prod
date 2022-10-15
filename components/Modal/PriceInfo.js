export default function ModalPriceInfo() {
  const modalName = "modal-price-info";
  return (
    <>
      <input type="checkbox" id={modalName} className="modal-toggle" />
      <label htmlFor={modalName} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="text-lg font-bold">Prakiraan harga</div>
          <p className="py-4">
            Harga yang tertera tidak mewakili harga jual sebenarnya.
          </p>
        </label>
      </label>
    </>
  );
}
