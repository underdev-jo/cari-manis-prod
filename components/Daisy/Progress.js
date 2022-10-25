export default function Progress({ type, className = "", max, value }) {
  const color = {
    primary: "progress progress-primary",
    secondary: "progress progress-secondary",
    accent: "progress progress-accent",
    warning: "progress progress-warning",
    error: "progress progress-error",
    info: "progress progress-info",
  };

  const fullClass = `${color[type]} ${className}`;

  return <progress className={fullClass} max={max} value={value} />;
}
