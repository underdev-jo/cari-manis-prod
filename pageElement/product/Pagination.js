import { slugify } from "helpers/util";
import { useRouter } from "next/router";
import style from "./Pagination.module.scss";

const ButtonPage = ({ num, disabled }) => {
  const { replace, query } = useRouter();
  const { page = 1 } = query;

  const numPage = parseInt(page, 10);
  const selected = numPage === num;
  const minPage = num === "min";
  const plusPage = num === "plus";

  const replaceParams = (value) => {
    const pageParams = slugify(value || "");
    let newQuery = { ...query, page: pageParams };
    const params = new URLSearchParams(newQuery).toString();
    replace(`/cari?${params}`);
  };

  let click = undefined;
  if (minPage) click = () => replaceParams(numPage - 1);
  else if (plusPage) click = () => replaceParams(numPage + 1);
  else if (!selected) click = () => replaceParams(num);

  let classSel = "text-carman-gray-3 border-transparent";
  if (selected)
    classSel = "border-carman-blue-1 text-carman-blue-1 cursor-not-allowed";
  const classDeny = num === "..." ? "pointer-events-none" : "";

  let borderColor = "border-transparent";
  if (selected) borderColor = "border-carman-blue-1";
  const hoverClass = `hover:bg-carman-blue-10 hover:${borderColor}`;
  const disClass = disabled ? "!btn-disabled" : "";
  const prepClass = `${classSel} ${hoverClass} ${classDeny} ${disClass}`;
  const defClass = `mx-[2px] btn btn-sm btn-square bg-white border-2 ${prepClass}`;

  let numDisplay = num;
  if (num === "min") numDisplay = "«";
  else if (num === "plus") numDisplay = "»";

  return (
    <button className={defClass} onClick={click}>
      {numDisplay}
    </button>
  );
};

export default function ProductPagination({ amount = 0 }) {
  const { query } = useRouter();
  const { page = 1 } = query;

  if (amount < 2) return "";

  let numSet = [1, 2, 3, 4];
  const numPage = parseInt(page, 10);
  const more4 = amount > 4;
  if (more4) {
    numSet = [numPage, numPage + 1, "...", amount - 1, amount];
    if (amount - numPage < 3)
      numSet = [amount - 3, amount - 2, amount - 1, amount];
  }

  const numList = [...new Set(numSet)];

  return (
    <div className="mx-auto flex justify-center my-6">
      <div className="inline-block mx-auto">
        <div className={style["pagination-wrapper"]}>
          {more4 && (
            <div className="mr-4">
              <ButtonPage num="min" disabled={numPage == 1} />
            </div>
          )}
          {numList.map((i) => (
            <ButtonPage key={i} num={i} />
          ))}
          {more4 && (
            <div className="ml-4">
              <ButtonPage num="plus" disabled={numPage >= amount} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
