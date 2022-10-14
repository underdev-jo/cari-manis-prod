import Image from "next/image";
import Section from "../../components/Sections/Section";

function ElementButton({ name, image }) {
  return (
    <div className="my-2 btn py-3 px-2 h-auto flex justify-start items-center normal-case border-[#E2E8F5] hover:border-[#E2E8F5] w-[173px] bg-white hover:bg-[#E2E8F5]">
      <div className="mr-3">
        <Image src={image} alt={name} title={name} width={32} height={32} />
      </div>
      <div className="text-small medium">{name}</div>
    </div>
  );
}

const category = [
  {
    image: "/bottle.svg",
    name: "Minuman Botol",
  },
  {
    image: "/cup.svg",
    name: "Minuman Kaleng",
  },
  {
    image: "/carton.svg",
    name: "Minuman Karton",
  },
  {
    image: "/sachet.svg",
    name: "Minuman Sachet",
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
