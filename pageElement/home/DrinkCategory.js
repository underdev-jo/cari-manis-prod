import Image from "next/image";
import { useRouter } from "next/router";
import { slugify } from "helpers/util";
import drinkCategory from "helpers/drinkCategory";
import Section from "components/Section";

function ButtonProductCategory({ name, image, slug }) {
  const { push } = useRouter();
  const classBtnFilter = `btn btn-ghost my-2 py-3 px-2 h-auto flex justify-start items-center normal-case w-[48%] max-w-[186px] border-[#E2E8F5]`;
  const onClick = () => push(`/cari?kemasan=${slugify(slug)}`);

  return (
    <button type="button" className={classBtnFilter} onClick={onClick}>
      <div className="mr-3">
        <Image src={image} alt={name} title={name} width={32} height={32} />
      </div>
      <div className="text-small medium">Minuman {name}</div>
    </button>
  );
}

export default function DrinkCategory() {
  return (
    <Section title="Cari berdasarkan kemasan">
      <div className="flex flex-wrap justify-between">
        {drinkCategory.map((item) => (
          <ButtonProductCategory key={item.name} {...item} />
        ))}
      </div>
    </Section>
  );
}
