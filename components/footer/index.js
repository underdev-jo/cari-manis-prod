import TwitterButton from "components/Button/twitter";
import DevLabel from "components/legal/dev-label";
import linkList from "helpers/menuList";
import Link from "next/link";
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

export default function Footer() {
  return (
    <div className={style.footer}>
      <div className={`text-small !text-white ${style.dev}`}>
        <DevLabel color="white" />
      </div>
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
    </div>
  );
}
