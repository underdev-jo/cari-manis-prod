import LogoCariManis from "../../public/logo-carimanis";
import LinkWrapper from "../LinkWrapper/LinkWrapper";

export default function Header({ admin = false }) {
  return (
    <div className="sticky top-0 z-50 navbar bg-primary text-white justify-between">
      <div className="flex-none">
        <LinkWrapper href="/">
          <button className="btn btn-ghost">
            <LogoCariManis />
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
  );
}
