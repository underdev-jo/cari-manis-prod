import Link from "next/link";

export default function LinkWrapper({ href, children = "Link Text" }) {
  if (!href) return <div>{children}</div>;
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  );
}
