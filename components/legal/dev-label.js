import style from "./dev-label.module.scss";

export default function DevLabel({}) {
  return (
    <div className={style.devLabel}>
      <div className={`${style["portfolio-experiment"]}`}>
        Develop by <span className={style["experiment-title"]}>underline</span>{" "}
        team © 2022
      </div>
    </div>
  );
}
