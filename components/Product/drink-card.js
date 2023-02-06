import { slugify } from "helpers/util";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import CalorieFire from "public/icons/calorie-fire";
import SugarCube from "public/icons/SugarCube";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPopProduct } from "store/slices/popinfo-product";

const DrinkCard = ({
  packaging = "",
  name = "",
  id = 1,
  image = "/sample-product-image.jpg",
  gula,
  netto,
  kalori,
  unitDisplay,
}) => {
  const [img, setImg] = useState(image);
  const { pathname: path } = useRouter();
  const dispatch = useDispatch();

  const productUrl = `/${slugify(name)}/${id}`;

  const onClick = (e) => {
    if (path !== "/") {
      e.preventDefault();
      dispatch(
        setPopProduct({
          id,
          netto,
          kalori,
          gula,
          image,
          name,
          nextUrl: productUrl,
          packaging,
        })
      );
    }
  };

  let unitView = (
    <>
      <SugarCube /> {gula}gr
    </>
  );
  let unitBadge = "badge-primary";

  if (unitDisplay === "calorie") {
    unitView = (
      <>
        <CalorieFire /> {kalori}kkal
      </>
    );
    unitBadge = "badge-accent";
  }

  return (
    <div
      layoutId={`product${id}`}
      className="overflow-hidden btn btn-ghost text-left h-auto bg-white hover:bg-white normal-case block border-[#E2E8F5] hover:border-[#E2E8F5] rounded-md p-3 m-2.5"
    >
      <Link href={productUrl} passHref>
        <div className="" onClick={onClick}>
          <div className="relative w-full h-[180px] overflow-hidden [&>span]:!bg-slate-300">
            {image ? (
              <Image
                src={img}
                alt={name}
                title={name}
                width={180}
                height={180}
                onError={() => setImg("/legal/cari-manis-broken.jpg")}
                quality={50}
              />
            ) : (
              <div className="bg-slate-200 animate-pulse w-full h-[158px]" />
            )}
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-1">
              <div
                className={`badge ${unitBadge} badge-sm mb-1 text-white gap-1 text-small font-medium`}
              >
                {unitView}
              </div>
              <div
                className="badge badge-primary badge-sm mb-1 badge-outline"
                title={packaging}
              >
                {packaging}
              </div>
            </div>
            <div className="text-small medium line-clamp-2" title={name}>
              {name}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DrinkCard;
