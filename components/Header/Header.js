import Image from "next/image";
import { useRouter } from "next/router";
import { runFunction } from "../../helpers/util";
import Burger from "../../public/Burger";
import Close from "../../public/Close";
import LogoCariManis from "../../public/logo-carimanis";
import LinkWrapper from "../LinkWrapper/LinkWrapper";

export default function Header({ admin = false, back }) {
  const router = useRouter();
  const defaultBack = () => router.back();
  const doBack = () => runFunction(back, defaultBack);
  const notHome = router.pathname !== "/";

  return (
    <header className="sticky top-0 z-50 bg-primary text-white">
      <div className="max-w-md mx-auto navbar justify-between">
        <div className="flex flex-none">
          {notHome && (
            <button
              className="btn btn-square btn-ghost text-white"
              onClick={doBack}
            >
              <Image
                src="/arrow-left-solid.svg"
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
                src="/logo-carimanis.svg"
                alt="Logo"
                title="Logo cari manis"
                width={68}
                height={36}
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
