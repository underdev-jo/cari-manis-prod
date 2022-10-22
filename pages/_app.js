import Header from "../components/Header/Header";
import ModalPriceInfo from "../components/Modal/PriceInfo";
import "../styles/globals.scss";
import "swiper/css";
import "swiper/css/pagination";

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
