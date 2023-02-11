import { apiSelection, apiSort, orLogic, supabase } from "helpers/supabase";
import { tableMinuman } from "helpers/util";

export const requestMilk = async () => {
  const reqStitch = await supabase
    .from(tableMinuman)
    .select()
    .or(orLogic("susu", "milk"))
    .filter("name", "not.ilike", "%coffee%")
    .filter("name", "not.ilike", "%kopi%")
    .filter("name", "not.ilike", "%teh%")
    .filter("name", "not.ilike", "%tea%")
    .range(0, 5);
  let status = reqStitch.status;
  return status === 200 ? reqStitch : null;
};

export default async function apiHomeContent(req, res) {
  if (req.method === "GET") {
    const data = {
      lowSugar: await apiSort("gula"),
      lowCal: await apiSort("kalori"),
      milk: await requestMilk(),
      coffee: await apiSelection("kopi", "coffee"),
      juice: await apiSelection("jus", "juice"),
      mostSweet: await apiSort("gula", true),
    };

    // if (data.lowSugar.error) return res.redirect([502], "/502");

    return res.status(200).json(data);
  }
}
