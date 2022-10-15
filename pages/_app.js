import Header from "../components/Header/Header";
import ModalPriceInfo from "../components/Modal/PriceInfo";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />

      {/* MODAL PRICE INFO */}
      <ModalPriceInfo />
    </>
  );
}

export default MyApp;
