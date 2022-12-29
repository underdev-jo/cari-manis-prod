import { Container } from "components";
import { Cover, DrinkCategory, DrinkList, SweetInfo } from "pageElement/home";
import PageHead from "pages/PageHead";

export default function Home({ drinkList }) {
  return (
    <>
      <PageHead title="Cari Manis" />
      <Container>
        <Cover />
        <DrinkCategory />
        <SweetInfo />
        <DrinkList drinkList={drinkList} />
      </Container>
    </>
  );
}
