import { slugify } from "helpers/util";
import Image from "next/image";
import Link from "next/link";
import SugarCube from "public/icons/SugarCube";

const DrinkCard = ({
  packaging = "Minuman Kaleng",
  name = "Nescafe,Coffee Drink Thai Milk Coffee 220Ml Klg dan sebagainya",
  id = 1,
  image = "/sample-product-image.jpg",
  gula,
  price,
}) => {
  const productUrl = `/${slugify(name)}/${id}`;
  return (
    <Link href={productUrl} passHref>
      <div className="overflow-hidden btn btn-ghost text-left h-auto bg-white hover:bg-white normal-case block border-[#E2E8F5] hover:border-[#E2E8F5] rounded-md p-3 m-2.5">
        <div className="relative w-full h-[160px] overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={name}
              title={name}
              width={160}
              height={160}
            />
          ) : (
            <div className="bg-slate-200 animate-pulse w-full h-[158px]" />
          )}
        </div>
        <div className="my-3">
          <div className="flex items-center gap-1">
            <div className="badge badge-primary badge-sm mb-1 text-white gap-1 text-small font-medium">
              <SugarCube /> {gula}gr
            </div>
            <div
              className="badge badge-primary badge-sm mb-1 badge-outline"
              title={packaging}
            >
              {packaging}
            </div>
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
