export default function SectionStatic({ title, children }) {
  return (
    <div className="mx-auto my-6 px-6">
      {title && <div className="text-heading3 mb-3">{title}</div>}
      {children}
    </div>
  );
}
