import ProductListItem from "components/Product/list-item";
// import { useSelector } from "react-redux";

const TotalCounter = ({ title, total, limit, units }) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-heading3 text-carman-gray-3">{title}</div>
      <div className="text-right">
        <div className="text-heading4 text-carman-gray-3" id="totalCountSugar">
          {total}
          {units}
        </div>
        <div className="text-small">
          Setara{" "}
          <span
            className={`badge badge-sm font-semibold text-white ${
              limit > 100 ? "badge-accent" : "badge-info"
            }`}
          >
            {limit}%
          </span>{" "}
          kebutuhan harian
        </div>
      </div>
    </div>
  );
};

export default function PopupKalkulator({
  calcProduct = [],
  detail = false,
  limit = { sugar: 0, calorie: 0 },
  total = { sugar: 0, calorie: 0 },
}) {
  // console.log("Product: ", calcProduct);
  // console.log("Counted: ", total);

  return (
    <div className="!pt-[80px] h-full content-wrapper">
      <div
        className={`relative overflow-hidden transition-all duration-300 ${
          detail ? "h-[100%]" : "!h-[0px]"
        } `}
      >
        <div className="px-2 text-heading3 text-carman-gray-2 border-b border-carman-gray-9 pb-3">
          Hasil Hitung Manismu
        </div>

        <div className="h-[65%] overflow-y-auto overflow-x-hidden">
          <div className="px-2">
            {calcProduct.map((item, index) => (
              <ProductListItem
                key={index}
                model="nutrition"
                {...item.data[0]}
              />
            ))}
          </div>
        </div>
        <div className="px-2 border-t border-carman-gray-9">
          <TotalCounter
            title="Total Gula"
            limit={limit.sugar}
            total={total.sugar}
            units="gr"
          />
          <TotalCounter
            title="Total Kalori"
            limit={limit.calorie}
            total={total.calorie}
            units="kkal"
          />
        </div>
      </div>
    </div>
  );
}
