import { createClient } from "@supabase/supabase-js";
import { supaKey, supaUrl } from "./util";

export const getCount = (table, eq = { column: "", value: "" }) => {
  return new Promise(async (resolve, reject) => {
    const supa = createClient(supaUrl(), supaKey());
    const { count } = await supa
      .from(table)
      .select("*", { count: "exact" })
      .eq(eq.column, eq.value);
    return resolve(count);
  });
};

export const eq = (table, eq = { column: "", value: "" }) => {
  return new Promise(async (resolve, reject) => {
    const supa = createClient(supaUrl(), supaKey());
    const { data, error } = await supa
      .from(table)
      .select("*")
      .eq(eq.column, eq.value);
    return resolve({ data, error });
  });
};

export const ilike = (table, ilike = { column: "", value: "" }) => {
  return new Promise(async (resolve, reject) => {
    const supa = createClient(supaUrl(), supaKey());
    const { data, error } = await supa
      .from(table)
      .select("*")
      .ilike(ilike.column, ilike.value);
    return resolve({ data, error });
  });
};

export const ilikeEq = (
  table,
  ilike = { column: "", value: "" },
  eq = { column: "", value: "" }
) => {
  return new Promise(async (resolve, reject) => {
    const supa = createClient(supaUrl(), supaKey());
    const { data, error } = await supa
      .from(table)
      .select("*")
      .ilike(ilike.column, ilike.value)
      .eq(eq.column, eq.value);
    return resolve({ data, error });
  });
};

export const get = (table) =>
  new Promise(async (resolve, reject) => {
    const supa = createClient(supaUrl(), supaKey());
    const { data, error } = await supa.from(table).select("*");
    return resolve({ data, error });
  });
