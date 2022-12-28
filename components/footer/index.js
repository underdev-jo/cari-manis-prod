import { linkList } from "helpers/menuList";
import Image from "next/image";
import Link from "next/link";
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
          className="mt-2 py-1 px-2 rounded-xl bg-primary inline-block text-center"
        >
          {username}
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
          <Image
            src="/legal/logo-carimanis.svg"
            alt="Logo"
            title="Logo cari manis"
            width={68}
            height={36}
            priority
          />
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
