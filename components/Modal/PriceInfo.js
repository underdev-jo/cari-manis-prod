export default function ModalPriceInfo() {
  const modalName = "modal-price-info";
  return (
    <>
      <input type="checkbox" id={modalName} className="modal-toggle" />
      <label htmlFor={modalName} className="modal cursor-pointer">
        <label className="modal-box relative" for="">
          <h3 className="text-lg font-bold">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            Youve been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
        </label>
      </label>
    </>
  );
}
