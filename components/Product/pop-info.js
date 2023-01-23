import { useDispatch, useSelector } from "react-redux";
import { setPopProduct } from "store/slices/popinfo-product";

export default function PopInfo() {
  const product = useSelector(({ popInfoProduct }) => popInfoProduct.product);

  const dispatch = useDispatch();

  const defClass =
    "fixed top-[50%] left-[50%] bg-white min-h-[20vh] w-[80vw] max-w-md rounded-[20px] -translate-x-[50%] transition-all shadow-xl z-50 border border-black";
  const actClass = product
    ? "-translate-y-[50%] opacity-100"
    : "translate-y-[70%] opacity-0 pointer-events-none";

  const fullClass = `${defClass} ${actClass}`;

  const close = () => dispatch(setPopProduct(false));

  console.log({ product });

  return (
    <>
      {product && (
        <div
          className="bg-primary-content opacity-70 fixed left-0 top-0 h-screen w-screen z-50"
          onClick={close}
        />
      )}
      <div className={fullClass}>
        <div className="relative">
          <div className="text-2xl text-black">{product.name}</div>
        </div>
      </div>
    </>
  );
}
