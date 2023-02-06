import { supabase } from "helpers/supabase";
import { arrStringObj, maxFetchData, tableMinuman } from "helpers/util";

const getProductSearch = async (
  req = NextApiRequest,
  res = NextApiResponse
) => {
  const maxData = maxFetchData;
  if (req.method === "GET") {
    const {
      gula = 999,
      kemasan = "",
      q = "",
      urutkan = "",
      jenis = "",
      page = 1,
    } = req.query;

    const count = { count: "exact" };

    console.log("Fetch: ", req.query);

    let api = supabase.from(tableMinuman).select("*", count);

    let qName = [];
    if (q) qName = `${q}`.split(/[ ,]+/);

    if (q || kemasan || gula) {
      let orName = `name.ilike.%${q}%`;
      if (qName.length > 0)
        orName = qName.map((qitem) => `name.ilike.%${qitem}%`);

      const orCat = `category.cs.${arrStringObj(qName)}`;

      api = supabase
        .from(tableMinuman)
        .select("*", count)
        .or(`${orName},${orCat}`)
        .ilike("packaging", `%${kemasan}%`)
        .lte("gula", gula);
    }

    let apiGroupType = api;
    if (jenis) apiGroupType = api.contains("category", `{${jenis}}`);

    let apiGroup = apiGroupType.order("created_at", { ascending: false });
    if (urutkan === "lowsugar") apiGroup = apiGroupType.order("gula");
    else if (urutkan === "highsugar")
      apiGroup = apiGroupType.order("gula", { ascending: false });
    else if (urutkan === "lowcal") apiGroup = apiGroupType.order("kalori");
    else if (urutkan === "highcal")
      apiGroup = apiGroupType.order("kalori", { ascending: false });

    const startLen = (page - 1) * maxData;
    const maxLen = startLen + maxData;

    const result = await apiGroup.range(startLen, maxLen);
    return res
      .status(200)
      .json({ query: req.query, result, propsKeyword: q, page });
  }
};

export default getProductSearch;
