import FluentCalculatorIcon from "public/icons/FluentCalculator";
import FluentHomeIcon from "public/icons/FluentHome";
import FluentInfoIcon from "public/icons/FluentInfo";
import FluentPeopleIcon from "public/icons/FluentPeople";
import FluentSearchIcon from "public/icons/FluentSearch";

const linkList = [
  { text: "Home", url: "/", image: <FluentHomeIcon /> },
  {
    text: "Cari Minuman",
    url: "/cari",
    image: <FluentSearchIcon />,
  },
  {
    text: "Kalkulator Manis",
    url: "/kalkulator",
    image: <FluentCalculatorIcon />,
    status: "new",
  },
  {
    text: "Sumber Informasi",
    url: "/sumber-informasi",
    image: <FluentInfoIcon />,
  },
  {
    text: "Tentang Pembuat",
    url: "/tentang-pembuat",
    image: <FluentPeopleIcon />,
  },
];

export { linkList };
