import { createClient } from "@supabase/supabase-js";
import { tableMinuman } from "./util";

const supaUrl = process.env.NEXT_PUBLIC_supabaseUrl;
const supaKey = process.env.NEXT_PUBLIC_supabaseKeySecret;

export const supabase = createClient(supaUrl, supaKey);

export const orLogic = (name1, name2) =>
  `name.ilike.%${name1}%,name.ilike.%${name2}%,category.cs.{${name1}},category.cs.{${name2}}`;

export const apiSort = async (tableName = "", descending) => {
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

export const apiSelection = async (name1, name2) => {
  const request = await supabase
    .from(tableMinuman)
    .select()
    .or(orLogic(name1, name2))
    .order("created_at", { ascending: true })
    .range(0, 5);
  let status = request.status;
  return status === 200 ? request : null;
};
