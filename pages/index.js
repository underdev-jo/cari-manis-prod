import Header from "../components/Header/Header";
import Container from "../components/Layout/Container";
import HomepageCover from "../pageLayout/Homepage/Cover";
import PageHead from "./PageHead";

export default function Home() {
  return (
    <>
      <PageHead title="Cari Manis" />
      <Header />
      <Container>
        <HomepageCover />
      </Container>
    </>
  );
}
