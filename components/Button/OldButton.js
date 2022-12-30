const Button = ({
  model = "primary",
  outline = false,
  children,
  type = "button",
  loading,
  disabled,
  className = "",
  onClick,
  onBlur,
}) => {
  const elChild = `${typeof children === "object" ? "flex items-center " : ""}`;
  const property = `${elChild}m-2 normal-case ${loading ? "loading " : ""}`;

  const btnModel = {
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    accent: "btn btn-accent",
    ghost: "btn btn-ghost",
    info: "btn btn-info",
    error: "btn btn-error",
    success: "btn btn-success",
    warning: "btn btn-warning",
    plain: "btn",
  };

  const clsModel = `${btnModel[model]} ${outline ? "btn-outline " : ""}`;

  return (
    <button
      className={`${clsModel}${property}${className}`}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      onBlur={onBlur}
    >
      {children}
    </button>
  );
};

export default Button;
