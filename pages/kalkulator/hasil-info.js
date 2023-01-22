import Button from "components/Button";
import { Close } from "public/icons";

const Wording = ({ total, limit }) => {
  return (
    <div className="mx-auto max-w-xs text-medium text-center mt-5">
      Jika kami mengkonsumsi minuman-minuman tadi sebanyak{" "}
      <span className="font-semibold">1 takaran saji</span>, maka total
      kandungan gulanya sebesar{" "}
      <span className="font-bold">{total.sugar}gr</span>. Atau setara dengan{" "}
      <span
        className={`badge font-bold text-white ${
          limit.sugar > 100 ? "badge-accent" : "badge-primary"
        }`}
      >
        {limit.sugar}%
      </span>{" "}
      kebutuhan gula harian kamu.
    </div>
  );
};

const HeadText = ({ limit }) => {
  let text = "Yay, Kandungan Gula-nya aman!";
  if (limit > 100) text = "Wah, kemanisan nih!";

  return <div className="text-carman-gray-2 font-bold text-center">{text}</div>;
};

const Faces = ({ limit }) => {
  let webp = "/icons/animoji/party-face.webp";
  let gif = "/icons/animoji/party-face.gif";
  let alt = "🥳";

  if (limit > 100) {
    webp = "/icons/animoji/dizzy-face.webp";
    gif = "/icons/animoji/dizzy-face.gif";
    alt = "😵";
  }

  return (
    <div className="flex justify-center w-full">
      <picture>
        <source srcSet={webp} type="image/webp" />
        <img src={gif} alt={alt} width={64} height={64} />
      </picture>
    </div>
  );
};

export default function HasilInfo({
  total = { sugar: 0, calorie: 0 },
  limit = { sugar: 0, calorie: 0 },
  detail,
  clickDetail,
  close,
}) {
  return (
    <div
      className={`transition-all overflow-hidden ${
        detail ? "!h-[0%]" : "h-auto"
      }`}
    >
      <button
        className="btn btn-circle btn-sm bg-carman-gray-1 hover:bg-carman-gray-2 absolute top-[8px] right-[8px] text-white flex items-center justify-center"
        onClick={close}
      >
        <Close size={20} />
      </button>
      <div className="py-6 px-5">
        <div className="mb-5">
          <Faces limit={limit} />
          <HeadText limit={limit} />
          <Wording total={total} limit={limit} />
          <div className="flex justify-center mt-5">
            <Button model="blue" onClick={clickDetail}>
              Lihat Detail
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
