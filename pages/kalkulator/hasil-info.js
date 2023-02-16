import Button from "components/Button";
import Close from "public/icons/Close";

const Wording = ({ total, limit, isOpen }) => {
  if (!isOpen) return "";
  else if (isOpen === "calorie")
    return (
      <div className="mx-auto max-w-xs text-medium mt-5">
        Jika kamu mengkonsumsi masing-masing kamu akan mengkonsumsi kalori
        sebanyak {total.calorie}kkal.
      </div>
    );

  return (
    <div className="mx-auto max-w-xs text-medium mt-5">
      Jika kamu mengkonsumsi masing-masing sebanyak{" "}
      <span className="font-semibold">1 takaran saji</span>, maka total
      kandungan gulanya sebesar{" "}
      <span className="font-bold">{total.sugar}gr</span>.
      <br />
      Atau setara dengan{" "}
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

const HeadText = ({ limit, isOpen }) => {
  if (!isOpen) return "";

  let text = "Yay, Kandungan Gula-nya aman!";
  if (limit.sugar > 100) text = "Wah, kemanisan nih!";

  if (isOpen === "calorie") {
    text = "Kalorinya masih aman lah";
    if (limit.calorie > 100) text = "Jumlah kalorinya bahaya nih!";
  }

  return <div className="text-carman-gray-2 font-bold text-center">{text}</div>;
};

const Faces = ({ limit, isOpen }) => {
  if (!isOpen) return "";

  let webp = "/icons/animoji/party-face.webp";
  let gif = "/icons/animoji/party-face.gif";
  let alt = "🥳";

  const checker = isOpen === "calorie" ? limit.calorie : limit.sugar;

  if (checker > 100) {
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
  isOpen,
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
          <Faces limit={limit} isOpen={isOpen} />
          <HeadText limit={limit} isOpen={isOpen} />
          <Wording total={total} limit={limit} isOpen={isOpen} />
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
