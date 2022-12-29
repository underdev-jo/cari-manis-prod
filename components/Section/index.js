export default function Section({ title, children }) {
  return (
    <section className="my-8 w-11/12 max-w-sm mx-auto">
      {title && <div className="text-heading4 mb-3">{title}</div>}
      <div>{children}</div>
    </section>
  );
}
