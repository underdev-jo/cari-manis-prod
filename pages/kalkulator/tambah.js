import SearchPage from "pages/cari";
import { useSelector } from "react-redux";

export default function TambahProduk({ dataSearch }) {
  console.log("Tambah: ", dataSearch);

  const addProduct = useSelector((state) => state.addProduct);
  const { popup } = addProduct;

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
