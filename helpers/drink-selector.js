import CategoryBottleIcon from "public/icons/bottle";
import CategoryCartonIcon from "public/icons/carton";
import CategoryCupIcon from "public/icons/cup";
import CategorySachetIcon from "public/icons/sachet";

const packaging = [
  {
    image: <CategoryBottleIcon />,
    value: "Minuman Botol",
    key: "Botol",
  },
  {
    image: <CategoryCupIcon />,
    value: "Minuman Kaleng",
    key: "Kaleng",
  },
  {
    image: <CategoryCartonIcon />,
    value: "Minuman Karton",
    key: "Karton",
  },
  {
    image: <CategorySachetIcon />,
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
  { value: "", label: "Produk Terbaru", isSelected: true },
  { value: "lowsugar", label: "Rendah Gula" },
  { value: "lowcal", label: "Rendah Kalori" },
  { value: "highsugar", label: "Tinggi Gula" },
  { value: "highcal", label: "Tinggi Kalori" },
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
