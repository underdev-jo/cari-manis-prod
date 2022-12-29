import { Container } from "components";
import { DrinkList } from "layouts/Product";
import { Cover, DrinkCategory, SweetInfo } from "pageElement/home";
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
