import "swiper/css";
import "swiper/css/pagination";
import "nprogress/nprogress.css";
import "styles/globals.scss";
import Header from "components/Header/Header";
import Footer from "components/footer";
import ModalPriceInfo from "components/Modal/PriceInfo";
import { Provider } from "react-redux";
import store from "store";
import useProductCalculator from "customHooks/useProductCalculator";
import nProgress from "nprogress";
import Router from "next/router";

nProgress.configure({
  minimum: 0.1,
  easing: "ease",
  speed: 500,
});

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

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
