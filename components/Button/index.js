export default function Button({ type = "button", children }) {
  return (
    <button
      className="btn flex items-center rounded normal-case min-h-[36px] px-3 h-[36px] bg-carman-black-1 text-white"
      type={type}
    >
      {children}
    </button>
  );
}
