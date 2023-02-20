import { supabase } from "helpers/supabase";
import {
  arrStringObj,
  getPagination,
  maxFetchData,
  tableMinuman,
} from "helpers/util";

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

    if (kemasan) {
      api = api.ilike("packaging", `%${kemasan}%`);
    }

    if (gula) {
      api = api.lte("gula", gula);
    }

    let apiGroupType = api;
    if (jenis) apiGroupType = api.contains("category", `{${jenis}}`);

    let apiGroup = apiGroupType;
    if (urutkan === "lowsugar")
      apiGroup = apiGroupType.order("gula", { ascending: true });
    else if (urutkan === "highsugar")
      apiGroup = apiGroupType.order("gula", { ascending: false });
    else if (urutkan === "lowcal")
      apiGroup = apiGroupType.order("kalori", { ascending: true });
    else if (urutkan === "highcal")
      apiGroup = apiGroupType.order("kalori", { ascending: false });

    // Should be        // Existing wrong
    // 0, 19            // 0, 19
    // 20, 39           // 19, 38
    // 40, 59           // 38, 57
    // 60, 89           // ....

    const { from, to } = getPagination(numPage - 1);

    const result = await apiGroup.range(from, to);

    return res
      .status(200)
      .json({ query: req.query, result, propsKeyword: q, page: numPage });
  }
};

export default getProductSearch;
