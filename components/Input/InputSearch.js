export default function InputSearch() {
  return (
    <div className="relative">
      <input
        className="rounded-lg py-3 px-4 border-2 input input-bordered w-full bg-transparent appearance-none"
        placeholder="Cari produk minuman..."
        type="text"
      />
      <button
        type="button"
        className="btn btn-ghost absolute"
        style={{ right: "0", top: "50%", transform: "translate(0, -50%)" }}
      >
        <img src="./icon-search.svg" alt="Search" />
      </button>
    </div>
  );
}
