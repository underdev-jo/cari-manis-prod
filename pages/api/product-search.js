import { supabase } from "helpers/supabase";
import { arrStringObj, maxFetchData, tableMinuman } from "helpers/util";

const getProductSearch = async (
  req = NextApiRequest,
  res = NextApiResponse
) => {
  const maxData = maxFetchData;
  if (req.method === "GET") {
    const {
      gula,
      kemasan = "",
      q = "",
      urutkan = "",
      jenis = "",
      page = 1,
    } = req.query;

    const numPage = parseInt(page, 10);
    const count = { count: "exact" };

    const rawAPI = supabase.from(tableMinuman).select("*", count);
    let api = rawAPI;

    let qName = [];
    if (q) {
      qName = `${q}`.split(/[,]+/);
      const hasComma = `${q}`.includes(",");
      const orName = qName.map((qitem) => `name.ilike.%${`${qitem}`.trim()}%`);
      const orCat = `category.cs.${arrStringObj(qName)}`;
      const categories = hasComma ? "" : `,${orCat}`;
      api = api.or(`${orName}${categories}`);
    }

    if (kemasan) api = api.ilike("packaging", `%${kemasan}%`);

    if (gula) api = api.lte("gula", gula);

    // if (q || kemasan || gula) {
    //   const hasComma = `${q}`.includes(",");

    //   let orName = `name.ilike.%${q}%`;
    //   if (hasComma)
    //     orName = qName.map((qitem) => `name.ilike.%${`${qitem}`.trim()}%`);

    //   const orCat = `category.cs.${arrStringObj(qName)}`;
    //   const categories = hasComma ? "" : `,${orCat}`;

    //   api = supabase
    //     .from(tableMinuman)
    //     .select("*", count)
    //     .or(`${orName}${categories}`)
    //     .ilike("packaging", `%${kemasan}%`)
    // }

    let apiGroupType = api;
    if (jenis) apiGroupType = api.contains("category", `{${jenis}}`);

    let apiGroup = apiGroupType;
    if (urutkan === "lowsugar") apiGroup = apiGroupType.order("gula");
    else if (urutkan === "highsugar")
      apiGroup = apiGroupType.order("gula", { ascending: false });
    else if (urutkan === "lowcal") apiGroup = apiGroupType.order("kalori");
    else if (urutkan === "highcal")
      apiGroup = apiGroupType.order("kalori", { ascending: false });

    const startLen = (numPage - 1) * maxData;
    const maxLen = startLen + maxData;

    const result = await apiGroup.range(startLen, maxLen);
    return res
      .status(200)
      .json({ query: req.query, result, propsKeyword: q, page: numPage });
  }
};

export default getProductSearch;
