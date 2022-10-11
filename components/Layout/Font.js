export default function Font({ children, type, className }) {
  let classType = "";
  if (type === "heading2") classType = "text-2xl font-bold";

  const fullClass = `${classType} ${className}`;

  return <span className={fullClass}>{children}</span>;
}
