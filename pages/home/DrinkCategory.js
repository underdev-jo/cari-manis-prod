import Image from "next/image";
import { useRouter } from "next/router";
import Section from "../../components/Sections/Section";
import { slugify } from "../../helpers/util";

function ElementButton({ name, image, slug }) {
  const { push } = useRouter();
  const classBtnFilter = `btn btn-ghost my-2 py-3 px-2 h-auto flex justify-start items-center normal-case w-[173px] border-[#E2E8F5]`;
  const onClick = () => push(`/search?kemasan=${slugify(slug)}`);

  return (
    <button type="button" className={classBtnFilter} onClick={onClick}>
      <div className="mr-3">
        <Image src={image} alt={name} title={name} width={32} height={32} />
      </div>
      <div className="text-small medium">{name}</div>
    </button>
  );
}

const category = [
  {
    image: "/icons/bottle.svg",
    name: "Minuman Botol",
    slug: "Botol",
  },
  {
    image: "/icons/cup.svg",
    name: "Minuman Kaleng",
    slug: "Kaleng",
  },
  {
    image: "/icons/carton.svg",
    name: "Minuman Karton",
    slug: "Karton",
  },
  {
    image: "/icons/sachet.svg",
    name: "Minuman Sachet",
    slug: "Sachet",
  },
];

export default function DrinkCategory() {
  return (
    <Section title="Cari berdasarkan kemasan">
      <div className="flex flex-wrap justify-between">
        {category.map((item) => (
          <ElementButton key={item.name} {...item} />
        ))}
      </div>
    </Section>
  );
}
