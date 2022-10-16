const Button = ({
  model = "primary",
  children,
  type = "button",
  loading,
  disabled,
  className = "",
  onClick,
}) => {
  const property = "flex items-center m-2";
  const btnModel = `btn-${model}`;
  const clsModel = `${btnModel} ${loading ? "loading" : ""} ${className}`;
  return (
    <button
      className={`btn ${clsModel} ${property}`}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
