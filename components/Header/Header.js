import Image from "next/image";
import { useRouter } from "next/router";
import { runFunction } from "../../helpers/util";
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
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
        </div>
      </div>
    </header>
  );
}
