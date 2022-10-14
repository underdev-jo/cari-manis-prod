import Header from "../../components/Header/Header";
import Container from "../../components/Layout/Container";
import Section from "../../components/Sections/Section";
import PageHead from "../PageHead";
import Cover from "./Cover";
import DrinkCategory from "./DrinkCategory";
import SweetInfo from "./SweetInfo";

export default function Home() {
  return (
    <>
      <PageHead title="Cari Manis" />
      <Header />
      <Container>
        <Cover />
        <DrinkCategory />
        <SweetInfo />
      </Container>
    </>
  );
}
