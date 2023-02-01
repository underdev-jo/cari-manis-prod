import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { runFunction } from "helpers/util";
import { Burger, Close } from "public/icons";
import { useEffect, useState } from "react";
import style from "./header.module.scss";
import { linkList } from "helpers/menuList";
import LogoCariManis from "public/legal/logo-carimanis";
import { useDispatch, useSelector } from "react-redux";
import {
  setPopupCalculator,
  setPopupDetailCalc,
} from "store/slices/calculatedPopup";

const LeftSide = ({ back }) => {
  const dispatch = useDispatch();

  const detail = useSelector(({ popupCalc }) => popupCalc.popupDetail);
  const isOpen = useSelector(({ popupCalc }) => popupCalc.popup);
  const router = useRouter();

  const { pathname: path, back: backRouter } = router;

  const defaultBack = () => backRouter();

  const doBack = () => {
    if (isOpen && detail) {
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
      <button className="btn btn-square btn-ghost text-white" onClick={doBack}>
        <Image
          src="/icons/arrow-left-solid.svg"
          alt="Back"
          width={26}
          height={30}
        />
      </button>
    );

  return (
    <div className="flex flex-none">
      {backButton}
      <Link href="/">
        <button className="btn btn-ghost">
          <div className="flex items-center [&>svg]:h-9">
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

const MenuView = ({ onBurger, toggleBurger }) => {
  return (
    <div className={`${style["menu-list"]} ${onBurger ? style.show : ""}`}>
      <div className="pt-20 max-w-md mx-auto">
        {linkList.map((item) => (
          <Link key={item.url} href={item.url} passHref>
            <div onClick={toggleBurger} className={style.linkWrapper}>
              <div className={style.linkBlock}>
                <div className={style.linkText}>{item.text}</div>
                {item.status === "new" && (
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-accent rounded-xl animate-ping opacity-30" />
                    <div className="relative badge badge-lg badge-accent">
                      {item.status}
                    </div>
                  </div>
                )}
                <div>
                  <Image
                    alt={item.text}
                    src={item.image}
                    width={32}
                    height={32}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

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
