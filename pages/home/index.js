import Header from "../../components/Header/Header";
import Container from "../../components/Layout/Container";
import PageHead from "../PageHead";
import Cover from "./Cover";
import DrinkCategory from "./DrinkCategory";
import DrinkList from "./DrinkList";
import SweetInfo from "./SweetInfo";

export default function Home({ drinkList }) {
  return (
    <>
      <PageHead title="Cari Manis" />
      <Header />
      <Container>
        <Cover />
        <DrinkCategory />
        <SweetInfo />
        <DrinkList drinkList={drinkList} />
      </Container>
    </>
  );
}
