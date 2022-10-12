import IconSearch from "../../public/IconSearch";

export default function InputSearch({ onSearch }) {
  return (
    <div className="relative">
      <input
        className="rounded-lg py-3 px-4 border-2 input input-bordered border-[#E1E8F5] w-full bg-transparent"
        placeholder="Cari produk minuman..."
        type="text"
      />
      <button
        type="button"
        className="btn btn-ghost no-animation absolute text-[#828282] active:bg-primary active:text-white"
        style={{ right: "0", top: "50%", transform: "translate(0, -50%)" }}
      >
        <IconSearch />
      </button>
    </div>
  );
}
