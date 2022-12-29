import Image from "next/image";
import { useRouter } from "next/router";
import { runFunction } from "helpers/util";
import { Burger, Close } from "public/icons";
import { LinkWrapper } from "components";
import { useState } from "react";
import style from "./header.module.scss";
import { linkList } from "helpers/menuList";
import Link from "next/link";

const LeftSide = ({ back }) => {
  const router = useRouter();
  const { pathname: path, asPath, back: backRouter } = router;
  const defaultBack = () => backRouter();
  const doBack = () => runFunction(back, defaultBack);
  const notHome =
    path !== "/_adminLogin" && path !== "/_dashboard" && path !== "/";

  let backButton = "";
  if (notHome)
    backButton = (
      <button className="btn btn-square btn-ghost text-white" onClick={doBack}>
        <Image
          src="/icons/arrow-left-solid.svg"
          alt="Back"
          title="Back"
          width={26}
          height={30}
        />
      </button>
    );

  return (
    <div className="flex flex-none">
      {backButton}
      <LinkWrapper href="/">
        <button className="btn btn-ghost">
          <Image
            src="/legal/logo-carimanis.svg"
            alt="Logo"
            title="Logo cari manis"
            width={68}
            height={36}
            priority
          />
        </button>
      </LinkWrapper>
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
  const badgeSoon = (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-full bg-accent rounded-xl animate-ping opacity-30" />
      <div className="relative badge badge-lg badge-accent">soon</div>
    </div>
  );
  return (
    <div className={`${style["menu-list"]} ${onBurger ? style.show : ""}`}>
      <div className="pt-20 max-w-md mx-auto">
        {linkList.map((item) => (
          <Link key={item.url} href={item.url} passHref>
            <a onClick={toggleBurger} className={style.linkWrapper}>
              <div className={style.linkBlock}>
                <div className={style.linkText}>{item.text}</div>
                {item.status === "soon" && badgeSoon}
                <div>
                  <Image
                    alt={item.text}
                    src={item.image}
                    width={32}
                    height={32}
                  />
                </div>
              </div>
            </a>
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

  const toggleBurger = () => setBurger(!onBurger);

  return (
    <>
      <MenuView onBurger={onBurger} toggleBurger={toggleBurger} />
      <header className="fixed top-0 right-0 left-0 z-50 bg-primary text-white">
        <div className="max-w-md mx-auto navbar justify-between">
          <LeftSide />
          <RightSide onBurger={onBurger} toggleBurger={toggleBurger} />
        </div>
      </header>
    </>
  );
}
