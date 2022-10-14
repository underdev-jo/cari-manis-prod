import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../helpers/util";

export default function DrinkCard({
  packaging = "Minuman Kaleng",
  name = "Nescafe,Coffee Drink Thai Milk Coffee 220Ml Klg dan sebagainya",
  id = 1,
  image = "/sample-product-image.jpg",
  sugar,
  price,
}) {
  const productUrl = `/${slugify(name)}/${id}`;
  return (
    <Link href={productUrl}>
      <div className="btn btn-ghost text-left h-auto bg-white hover:bg-white normal-case block border-[#E2E8F5] hover:border-[#E2E8F5] rounded-md p-3 m-2.5">
        <Image src={image} alt={name} title={name} width={157} height={157} />
        <div className="my-3">
          <div className="badge badge-primary badge-sm mb-1 badge-outline">
            {packaging}
          </div>
          <div className="text-small medium line-clamp-2">{name}</div>
        </div>
      </div>
    </Link>
  );
}
