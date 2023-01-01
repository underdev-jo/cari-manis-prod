import "styles/globals.scss";
import "swiper/css";
import "swiper/css/pagination";
import Header from "components/Header/Header";
import Footer from "components/footer";
import ModalPriceInfo from "components/Modal/PriceInfo";
import { Provider } from "react-redux";
import store from "store";
import useProductCalculator from "customHooks/useProductCalculator";

const MainWrapper = ({ Component, pageProps }) => {
  useProductCalculator();
  return (
    <main>
      <Component {...pageProps} />
    </main>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <MainWrapper Component={Component} pageProps={pageProps} />
        <ModalPriceInfo />
        <Footer />
        <Header />
      </Provider>
    </>
  );
}

export default MyApp;
