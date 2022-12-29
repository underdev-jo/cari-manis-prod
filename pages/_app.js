import "styles/globals.scss";
import "swiper/css";
import "swiper/css/pagination";
import Header from "components/Header/Header";
import Footer from "components/footer";
import ModalPriceInfo from "components/Modal/PriceInfo";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
      <Header />
    </>
  );
}

export default MyApp;
