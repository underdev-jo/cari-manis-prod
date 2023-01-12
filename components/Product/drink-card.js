import { slugify } from "helpers/util";
import Image from "next/image";
import Link from "next/link";

const DrinkCard = ({
  packaging = "Minuman Kaleng",
  name = "Nescafe,Coffee Drink Thai Milk Coffee 220Ml Klg dan sebagainya",
  id = 1,
  image = "/sample-product-image.jpg",
  sugar,
  price,
}) => {
  const productUrl = `/${slugify(name)}/${id}`;
  return (
    <Link href={productUrl} passHref>
      <div className="btn btn-ghost text-left h-auto bg-white hover:bg-white normal-case block border-[#E2E8F5] hover:border-[#E2E8F5] rounded-md p-3 m-2.5">
        <div className="rounded-lg overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={name}
              title={name}
              width={157}
              height={157}
              priority
            />
          ) : (
            <div className="bg-slate-200 animate-pulse w-full h-[158px]" />
          )}
        </div>
        <div className="my-3">
          <div
            className="badge badge-primary badge-sm mb-1 badge-outline"
            title={packaging}
          >
            {packaging}
          </div>
          <Link href={productUrl} title={name} passHref>
            <div className="text-small medium line-clamp-2" title={name}>
              {name}
            </div>
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default DrinkCard;
