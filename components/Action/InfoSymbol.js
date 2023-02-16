import InfoCircle from "public/icons/InfoCircle";

export default function InfoSymbol({ color = "primary" }) {
  return (
    <div className="relative">
      <div
        className={`absolute left-0 top-0 w-full h-full bg-${color} opacity-30 rounded-lg animate-ping`}
      />
      <label htmlFor="modal-price-info">
        <InfoCircle />
      </label>
    </div>
  );
}
