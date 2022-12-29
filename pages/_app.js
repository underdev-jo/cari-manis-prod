import "styles/globals.scss";
import "swiper/css";
import "swiper/css/pagination";
import Header from "components/Header/Header";
import Footer from "components/footer";
import ModalPriceInfo from "components/Modal/PriceInfo";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <ModalPriceInfo />
      <Footer />
      <Header />
    </div>
  );
}

export default MyApp;
