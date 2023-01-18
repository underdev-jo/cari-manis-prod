const Title = ({ title, rightHead }) => (
  <div className="flex items-center justify-between">
    <div className="text-heading4 mb-3">{title}</div>
    <div>{rightHead}</div>
  </div>
);

export default function Section({ title, children, rightHead }) {
  let titleView = "";
  if (title) titleView = <Title title={title} rightHead={rightHead} />;
  return (
    <section className="my-8 w-11/12 max-w-sm mx-auto">
      {titleView}
      <div>{children}</div>
    </section>
  );
}
