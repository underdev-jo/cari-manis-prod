export default function InfoSymbol({ color = "primary" }) {
  return (
    <div className="relative">
      <div
        className={`absolute left-0 top-0 w-full h-full bg-${color} opacity-30 rounded-lg animate-ping`}
      />
      <label
        htmlFor="modal-price-info"
        className={`relative bg-white block badge badge-sm badge-${color} badge-outline text-xs cursor-pointer`}
      >
        i
      </label>
    </div>
  );
}
