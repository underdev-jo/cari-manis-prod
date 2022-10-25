export default function Badge({ type, className = "", children }) {
  const color = {
    primary: "badge badge-primary",
    secondary: "badge badge-secondary",
    accent: "badge badge-accent",
    warning: "badge badge-warning",
    error: "badge badge-error",
    info: "badge badge-info",
  };

  const fullClass = `${color[type]} ${className}`;

  return <div className={fullClass}>{children}</div>;
}
