const modelClass = {
  default: "bg-carman-black-1 text-white",
  blue: "bg-carman-blue-1 text-white border-carman-blue-1",
};

const sizeClass = {
  default: "min-h-[40px] h-[40px]",
  small: "min-h-[36px] h-[36px] !px-3",
};

export default function Button({
  type = "button",
  onClick,
  children,
  className = "",
  model = "default",
  size = "default",
}) {
  const classBtn = "btn flex items-center rounded normal-case px-8";
  const stylingClass = `${modelClass[model]} ${sizeClass[size]}`;
  return (
    <button
      className={`${className} ${stylingClass} ${classBtn}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
