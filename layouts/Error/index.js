import Image from "next/image";

export default function ErrorLayout({
  title,
  children,
  imagePath = "/faces/flat-face.svg",
}) {
  return (
    <div
      className="content-wrapper text-center py-4 mt-8 mb-8"
      style={{ minHeight: "500px" }}
    >
      <div className="mb-4">
        <Image width={144} height={146} alt="Error Face" src={imagePath} />
      </div>
      <h2 className="text-carman-gray-2 heading-3 mb-3">{title}</h2>
      <div className="p-2">{children}</div>
    </div>
  );
}
