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
  { key: "", value: "Semua" },
  { key: `5`, value: "Max. 5gr" },
  { key: `10`, value: "Max. 10gr" },
  { key: `20`, value: "Max. 20gr" },
  { key: `30`, value: "Max. 30gr" },
  { key: `50`, value: "Max. 50gr" },
  { key: `999`, value: ">50gr" },
];

export { packaging as selectorPackaging, sugar as selectorSugar };
