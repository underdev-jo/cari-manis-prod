const packaging = [
  {
    image: "/icons/bottle.svg",
    value: "Minuman Botol",
    key: "Botol",
  },
  {
    image: "/icons/cup.svg",
    value: "Minuman Kaleng",
    key: "Kaleng",
  },
  {
    image: "/icons/carton.svg",
    value: "Minuman Karton",
    key: "Karton",
  },
  {
    image: "/icons/sachet.svg",
    value: "Minuman Sachet",
    key: "Sachet",
  },
];

const sugar = [
  { value: "", label: "Semua Kadar", isSelected: true },
  { value: `5`, label: "Max. 5gr" },
  { value: `10`, label: "Max. 10gr" },
  { value: `20`, label: "Max. 20gr" },
  { value: `30`, label: "Max. 30gr" },
  { value: `50`, label: "Max. 50gr" },
];

const sort = [
  { value: "", label: "Tanggal", isSelected: true },
  { value: "lowsugar", label: "Gula Terendah" },
  { value: "lowcal", label: "Kalori Terendah" },
];

const typeDrink = [
  { value: "", label: "Semua Jenis", isSelected: true },
  { value: "teh", label: "Teh" },
  { value: "kopi", label: "Kopi" },
  { value: "susu", label: "Susu" },
  { value: "jus", label: "Jus" },
  { value: "softdrink", label: "Soft Drink" },
];

export {
  packaging as selectorPackaging,
  sugar as selectorSugar,
  sort as selectorSort,
  typeDrink as selectorType,
};
