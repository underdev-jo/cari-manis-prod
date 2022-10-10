const Button = ({
  model = "primary",
  children,
  type = "button",
  loading,
  disabled,
}) => {
  const property = "flex items-center m-2";
  const clsModel = `btn-${model} ${loading ? "loading" : ""}`;
  return (
    <button
      className={`btn ${clsModel} ${property}`}
      type={type}
      disabled={disabled || loading}
    >
      {children}
    </button>
  );
};

export default Button;
