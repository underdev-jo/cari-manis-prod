import SearchPage from "pages/cari";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function TambahProduk() {
  const [dataSearch, setData] = useState(false);

  const addProduct = useSelector((state) => state.addProduct);
  const { popup } = addProduct;

  useEffect(() => {
    const f = async () => {
      const res = await (await fetch("api/product-search")).json();
      console.log("Res data: ", res);
      setData(res);
    };

    f();
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 h-screen w-screen z-50 bg-white ${
        popup ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="mt-[70px]">
        <div>Test Popup</div>
        {dataSearch ? (
          <SearchPage {...dataSearch} />
        ) : (
          <div className="text-2xl">Loading</div>
        )}
      </div>
    </div>
  );
}
