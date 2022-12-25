import Image from "next/image";
import { useRouter } from "next/router";
import { runFunction } from "helpers/util";
import LinkWrapper from "components/LinkWrapper/LinkWrapper";
import { Burger, Close } from "public/icons";

export default function Header({ admin = false, back }) {
  const router = useRouter();
  const { pathname: path, asPath, back: backRouter } = router;
  const defaultBack = () => backRouter();
  const doBack = () => runFunction(back, defaultBack);
  const notHome =
    path !== "/_adminLogin" && path !== "/_dashboard" && path !== "/";

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-primary text-white">
      <div className="max-w-md mx-auto navbar justify-between">
        <div className="flex flex-none">
          {notHome && (
            <button
              className="btn btn-square btn-ghost text-white"
              onClick={doBack}
            >
              <Image
                src="/icons/arrow-left-solid.svg"
                alt="B"
                title="Back"
                width={26}
                height={30}
              />
            </button>
          )}
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
        <div className="flex-none text-white">
          <label className="btn btn-square btn-ghost swap swap-rotate">
            <input type="checkbox" />
            <div className="swap-off fill-current text-white">
              <Burger />
            </div>
            <div className="swap-on fill-current text-white">
              <Close />
            </div>
          </label>
        </div>
      </div>
    </header>
  );
}
