import { linkList } from "helpers/menuList";
import Link from "next/link";
import TwitterLogo from "public/icons/twitter-logo";
import LogoCariManis from "public/legal/logo-carimanis";
import style from "./footer.module.scss";

const LinkItem = (item) => {
  return (
    <Link href={item.url} key={item.url}>
      <div className="flex">
        <a
          href={item.url}
          className="mb-2 hover:underline pointer cursor-pointer"
        >
          {item.text}
        </a>
        {item.status && (
          <div className="relative badge badge-xs badge-accent ml-2">
            <div className="absolute top-0 left-0 rounded-lg w-full h-full bg-accent opacity-50 animate-ping" />
            <div>{item.status}</div>
          </div>
        )}
      </div>
    </Link>
  );
};

const TwitterButton = ({ username }) => {
  return (
    <div>
      <Link
        href={`https://twitter.com/${username}?tweet=Saya dari cari-manis, ingin `}
        passHref
      >
        <a
          target="_blank"
          className="mt-2 py-1 px-2 rounded-xl bg-primary inline-block"
        >
          <div className="flex items-center text-left [&>svg]:w-4 [&>svg]:h-4">
            <TwitterLogo />
            <span className="ml-2">{username}</span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default function Footer() {
  return (
    <div className={style.footer}>
      <div className="content-wrapper text-small">
        <div className={style.product}>
          <div className="flex items-center [&>svg]:h-9 [&>svg]:w-20 pb-2">
            <LogoCariManis />
          </div>
          <div>Pusat informasi kandungan gula pada minuman Anda.</div>
        </div>
        <div className={style.action}>
          <div>
            <div className="font-bold mb-2">QUICK LINK</div>
            {linkList
              .filter((i) => i.url !== "/")
              .map((item) => (
                <LinkItem {...item} key={item.url} />
              ))}
          </div>
          <div>
            <div className="font-bold mb-2">SARAN & FEEDBACK</div>
            <div>Mention kami di twitter</div>
            <TwitterButton username="tanganjojo" />
            <TwitterButton username="mukharomf" />
          </div>
        </div>
      </div>
      <div className={`text-small ${style.dev}`}>
        Developed by underline &copy; 2022
      </div>
    </div>
  );
}
