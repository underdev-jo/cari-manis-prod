import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { runFunction } from "helpers/util";
import { ArrowLeftSolid, Burger, Close } from "public/icons";
import { useEffect, useState } from "react";
import style from "./header.module.scss";
import { linkList } from "helpers/menuList";
import LogoCariManis from "public/legal/logo-carimanis";
import { useDispatch, useSelector } from "react-redux";
import {
  setPopupCalculator,
  setPopupDetailCalc,
} from "store/slices/calculatedPopup";
import { setPopupAdd } from "store/slices/addProduct";

const LeftSide = ({ back }) => {
  const dispatch = useDispatch();

  const detail = useSelector(({ popupCalc }) => popupCalc.popupDetail);
  const isOpen = useSelector(({ popupCalc }) => popupCalc.popup);
  const isAddCalcOpen = useSelector(({ addProduct }) => addProduct.popup);
  const router = useRouter();

  const { pathname: path, back: backRouter } = router;

  const defaultBack = () => backRouter();

  const doBack = () => {
    if (isAddCalcOpen) {
      dispatch(setPopupAdd(false));
      document.body.removeAttribute("style");
    } else if (isOpen && detail) {
      dispatch(setPopupDetailCalc(false));
      setTimeout(() => dispatch(setPopupCalculator(false)), 400);
    } else if (isOpen) {
      dispatch(setPopupCalculator(false));
    } else runFunction(back, defaultBack);
  };

  const notHome =
    path !== "/_adminLogin" && path !== "/_dashboard" && path !== "/";

  let backButton = "";
  if (notHome)
    backButton = (
      <button
        className="btn btn-square btn-ghost text-white [&>svg]:w-[26px] [&>svg]:h-[30px]"
        onClick={doBack}
      >
        <ArrowLeftSolid />
      </button>
    );

  return (
    <div className="flex flex-none">
      {backButton}
      <Link href="/">
        <button className="btn btn-ghost">
          <div className="flex items-center [&>svg]:w-[83px] [&>svg]:h-[38px]">
            <LogoCariManis />
          </div>
        </button>
      </Link>
    </div>
  );
};

const RightSide = ({ toggleBurger, onBurger }) => {
  return (
    <div className="flex-none text-white">
      <button
        className={`btn btn-square btn-ghost swap swap-rotate ${
          onBurger ? "swap-active" : ""
        }`}
        onClick={toggleBurger}
      >
        <div className="swap-off fill-current text-white">
          <Burger />
        </div>
        <div className="swap-on fill-current text-white">
          <Close />
        </div>
      </button>
    </div>
  );
};

const Badge = ({ status }) => {
  if (!status) return "";
  const isSoon = status === "soon";
  const ping = isSoon ? (
    <div className="absolute top-0 left-0 w-full h-full bg-accent rounded-xl animate-ping opacity-30" />
  ) : (
    ""
  );
  return (
    <div className="relative">
      {ping}
      <div className="relative badge badge-lg badge-accent">{status}</div>
    </div>
  );
};

const MenuView = ({ onBurger, toggleBurger }) => {
  const variants = {
    hidden: { y: -20, opacity: 0, transition: { duration: 0.2 } },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className={`${style["menu-list"]} ${onBurger ? style.show : ""}`}>
      <motion.div
        className="pt-20 max-w-md mx-auto"
        animate={onBurger ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              type: "spring",
              duration: 0.2,
              delayChildren: 0.1,
              staggerChildren: 0.05,
            },
          },
        }}
      >
        {linkList.map((item) => (
          <motion.div key={item.url} variants={variants}>
            <Link href={item.url} passHref>
              <div onClick={toggleBurger} className={style.linkWrapper}>
                <div className={style.linkBlock}>
                  <div className={style.linkText}>{item.text}</div>
                  <Badge status={item.status} />
                  <div>{item.image}</div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className={style.devLabel}>
        <div className={style["portfolio-experiment"]}>
          Develop by{" "}
          <span className={style["experiment-title"]}>underline</span> team ©
          2022
        </div>
      </div>
    </div>
  );
};

export default function Header({ admin = false, back }) {
  const [onBurger, setBurger] = useState(false);
  const { pathname: path } = useRouter();

  const toggleBurger = () => setBurger(!onBurger);

  useEffect(() => {
    setBurger(false);
  }, [path]);

  return (
    <header>
      <MenuView onBurger={onBurger} toggleBurger={toggleBurger} />
      <div className="fixed top-0 right-0 left-0 z-50 bg-primary text-white">
        <div className="max-w-md mx-auto navbar justify-between">
          <LeftSide />
          <RightSide onBurger={onBurger} toggleBurger={toggleBurger} />
        </div>
      </div>
    </header>
  );
}
