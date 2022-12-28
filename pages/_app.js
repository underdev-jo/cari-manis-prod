import "../styles/globals.scss";
import "swiper/css";
import "swiper/css/pagination";
import Footer from "components/footer";
import ModalPriceInfo from "components/Modal/PriceInfo";
import Header from "components/Header/Header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ModalPriceInfo />
      <Footer />
      <Header />
    </>
  );
}

export default MyApp;
