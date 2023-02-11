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
  let status = res.status;
  return status === 200 ? res : null;
};

const orLogic = (name1, name2) =>
  `name.ilike.%${name1}%,name.ilike.%${name2}%,category.cs.{${name1}},category.cs.{${name2}}`;

const apiSelection = async (name1, name2) => {
  const request = await supabase
    .from(tableMinuman)
    .select()
    .or(
      `name.ilike.%${name1}%,name.ilike.%${name2}%,category.cs.{${name1}},category.cs.{${name2}}`
    )
    .order("created_at", { ascending: true })
    .range(0, 5);
  let status = request.status;
  return status === 200 ? request : null;
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
  let status = reqStitch.status;
  return status === 200 ? reqStitch : null;
};

export default async function apiHomeContent(req, res) {
  const data = {
    lowSugar: await apiSort("gula"),
    lowCal: await apiSort("kalori"),
    milk: await requestMilk(),
    coffee: await apiSelection("kopi", "coffee"),
    juice: await apiSelection("jus", "juice"),
    mostSweet: await apiSort("gula", true),
  };

  if (data.lowSugar.error) return res.redirect([502], "/502");

  return res.status(200).json(data);
}
