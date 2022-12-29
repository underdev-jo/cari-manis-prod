export default function Spinner({ color = "primary" }) {
  const colorClass = `border-${color}`;
  const elementClass =
    "animate-spin h-8 w-8 rounded-full border-2 border-b-transparent mx-auto";
  return (
    <div className="relative mx-auto text-center m-4">
      <div className={`${elementClass} ${colorClass}`} />
    </div>
  );
}
