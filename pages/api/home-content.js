import { supabase } from "helpers/supabase";
import { tableMinuman } from "helpers/util";

const apiSort = async (tableName = "", descending) => {
  const options = { ascending: descending ? false : true };
  if (!tableName && typeof tableName !== "string")
    return { error: { message: "No table name provided" } };
  const res = await supabase
    .from(tableMinuman)
    .select()
    .order(tableName, options)
    .range(0, 5);
  return res;
};

const orLogic = (name1, name2) =>
  `name.ilike.%${name1}%,name.ilike.%${name2}%,category.cs.{${name1}},category.cs.{${name2}}`;

const apiSelection = async (name1, name2) => {
  const request = supabase
    .from(tableMinuman)
    .select()
    .or(
      `name.ilike.%${name1}%,name.ilike.%${name2}%,category.cs.{${name1}},category.cs.{${name2}}`
    );
  return request.order("created_at", { ascending: false }).range(0, 5);
};

const requestMilk = async () => {
  const reqStitch = await supabase
    .from(tableMinuman)
    .select()
    .or(orLogic("susu", "milk"))
    .filter("name", "not.ilike", "%coffee%")
    .filter("name", "not.ilike", "%kopi%")
    .filter("name", "not.ilike", "%teh%")
    .filter("name", "not.ilike", "%tea%")
    .range(0, 5);
  return reqStitch;
};

export default async function apiHomeContent(req, res) {
  const data = {
    lowSugar: await apiSort("gula"),
    lowCal: await apiSort("kalori"),
    milk: await requestMilk(),
    coffee: await apiSelection("kopi", "coffee"),
    juice: await apiSelection("jus", "juice"),
    highCal: await apiSort("kalori", true),
  };

  if (data.lowSugar.error) return res.redirect([502], "/502");

  return res.status(200).json(data);
}
