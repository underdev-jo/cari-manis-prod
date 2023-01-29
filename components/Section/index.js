import { useEffect } from "react";

const Title = ({ title, rightHead, sticky, underTitle, overTitle }) => {
  const classSticky = sticky ? `sticky top-16 z-50 bg-white pt-2` : "";
  return (
    <div className={classSticky}>
      <div>
        <div>{overTitle}</div>
        <div className={`flex items-center justify-between`}>
          <div className="text-heading4 mb-3">{title}</div>
          <div>{rightHead}</div>
        </div>
        <div className="pb-2">{underTitle}</div>
      </div>
    </div>
  );
};

export default function Section({
  title,
  children,
  rightHead,
  sticky,
  underTitle,
}) {
  let titleView = "";
  if (title)
    titleView = (
      <Title
        title={title}
        rightHead={rightHead}
        sticky={sticky}
        underTitle={underTitle}
      />
    );

  useEffect(() => {
    let parent = document.querySelector(".sticky")?.parentElement;

    if (parent) {
      while (parent) {
        const hasOverflow = getComputedStyle(parent).overflow;
        if (hasOverflow !== "visible") {
          console.log(hasOverflow, parent);
        }
        parent = parent.parentElement;
      }
    }
  });

  return (
    <section className="my-8 w-11/12 max-w-sm mx-auto">
      {titleView}
      <div>{children}</div>
    </section>
  );
}
