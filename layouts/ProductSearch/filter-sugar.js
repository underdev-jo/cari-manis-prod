import Dropdown from "components/Dropdown";
import { selectorSugar } from "helpers/drink-selector";
import { slugify } from "helpers/util";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { query } = context;
  return { props: { query } };
}

export default function FilterSugar({ query }) {
  const { replace, query: queryParam } = useRouter();
  const filtering = query?.gula || "";

  const replacePaarams = (value) => {
    const gula = slugify(value || "");
    let newQuery = { ...queryParam, gula };
    const params = new URLSearchParams(newQuery).toString();
    replace(`/cari?${params}`);
  };

  const onSelectSugar = (e) => {
    replacePaarams(e.key);
  };

  let textDropdown = "Kadar Gula ⯆";
  if (filtering)
    textDropdown = `Kadar Gula: ${
      selectorSugar.find((i) => i.key === filtering).value
    } ⯆`;

  return (
    <Dropdown
      list={selectorSugar}
      selected={filtering}
      text={textDropdown}
      onSelect={onSelectSugar}
      size="xs"
    />
  );
}
