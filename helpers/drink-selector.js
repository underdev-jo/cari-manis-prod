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
  { key: "", value: "Semua Kadar" },
  { key: `5`, value: "Max. 5gr" },
  { key: `10`, value: "Max. 10gr" },
  { key: `20`, value: "Max. 20gr" },
  { key: `30`, value: "Max. 30gr" },
  { key: `50`, value: "Max. 50gr" },
];

const sort = [
  { key: "", value: "Tanggal" },
  { key: "lowsugar", value: "Gula Terendah" },
  { key: "lowcal", value: "Kalori Terendah" },
];

const typeDrink = [
  { key: "", value: "Semua Jenis" },
  { key: "teh", value: "Teh" },
  { key: "kopi", value: "Kopi" },
  { key: "susu", value: "Susu" },
  { key: "jus", value: "Jus" },
  { key: "softdrink", value: "Soft Drink" },
];

export {
  packaging as selectorPackaging,
  sugar as selectorSugar,
  sort as selectorSort,
  typeDrink as selectorType,
};
