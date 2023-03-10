import "swiper/css";
import "swiper/css/pagination";
import "nprogress/nprogress.css";
import "styles/globals.scss";
import { Analytics } from "@vercel/analytics/react";
import Header from "components/Header/Header";
import Footer from "components/footer";
import ModalPriceInfo from "components/Modal/PriceInfo";
import { Provider } from "react-redux";
import store from "store";
import useProductCalculator from "customHooks/useProductCalculator";
import nProgress from "nprogress";
import Router from "next/router";
import PopInfo from "components/Product/pop-info";
import ModalOptionFilter from "layouts/ProductSearch/modal-option-filter";

nProgress.configure({
  minimum: 0.1,
  easing: "ease",
  speed: 100,
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
        <PopInfo />
        <ModalOptionFilter />
      </Provider>
      <Analytics mode={process.env.environment} />
    </>
  );
}

export default MyApp;
