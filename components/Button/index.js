export default function Button({
  type = "button",
  onClick,
  children,
  className,
}) {
  const classBtn =
    "btn flex items-center rounded normal-case min-h-[36px] px-3 h-[36px] bg-carman-black-1 text-white";
  return (
    <button
      className={`${classBtn} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
