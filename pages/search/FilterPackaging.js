import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { get } from "../../helpers/api";

const Pressable = ({ children, id, disabled, query: queryProps }) => {
  const { replace, query } = useRouter();

  let newQuery = { ...query, kemasan: `${queryProps || ""}` };
  const params = new URLSearchParams(newQuery).toString();
  const go = () => replace(`/search?${params}`);

  return (
    <Button
      key={id}
      model="secondary"
      className={`normal-case btn-xs ${disabled ? "btn-outline" : ""}`}
      disabled={disabled}
      onClick={go}
    >
      {children}
    </Button>
  );
};

export default function FilterPackaging() {
  const [packages, setPackages] = useState(false);

  const { query } = useRouter();
  const filtering = query.kemasan || "";

  useEffect(() => {
    const hit = async () => {
      const res = await get("kemasan_minuman");
      setPackages(res.data || res);
    };

    if (!packages) {
      hit();
    }
  }, [packages]);

  return (
    <div className="flex my-2 overflow-y-auto">
      <Pressable id="" query="" disabled={filtering === ""}>
        Semua
      </Pressable>
      {packages || packages.length > 0
        ? packages.map((item) => (
            <Pressable
              key={item.id}
              id={item.id}
              disabled={filtering === item.name}
              query={item.name}
            >
              {item.name}
            </Pressable>
          ))
        : ""}
    </div>
  );
}
