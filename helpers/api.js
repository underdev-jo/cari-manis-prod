import { supabase } from "./supabase";

export const getCount = (table, eq = { column: "", value: "" }) => {
  return new Promise(async (resolve, reject) => {
    const { count } = await supabase
      .from(table)
      .select("*", { count: "exact" })
      .eq(eq.column, eq.value);
    return resolve(count);
  });
};

export const eq = (table, eq = { column: "", value: "" }) => {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq(eq.column, eq.value);
    return resolve({ data, error });
  });
};

export const ilike = (table, ilike = { column: "", value: "" }) => {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .ilike(ilike.column, ilike.value);
    return resolve({ data, error });
  });
};

export const lte = (table, col = { column: "", value: "" }) => {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .lte(col.column, col.value);
    return resolve({ data, error });
  });
};

export const ilike2 = (
  table,
  col1 = { column: "", value: "" },
  col2 = { column: "", value: "" }
) => {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .ilike(col1.column, col1.value)
      .ilike(col2.column, col2.value);
    return resolve({ data, error });
  });
};

export const ilikelte = (
  table,
  col1 = { column: "", value: "" },
  col2 = { column: "", value: "" }
) => {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .ilike(col1.column, col1.value)
      .lte(col2.column, col2.value);
    return resolve({ data, error });
  });
};

export const ilike2lte = (
  table,
  col1 = { column: "", value: "" },
  col2 = { column: "", value: "" },
  col3 = { column: "", value: "" }
) => {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .ilike(col1.column, col1.value)
      .ilike(col2.column, col2.value)
      .lte(col3.column, col3.value);
    return resolve({ data, error });
  });
};

export const ilikeEq = (
  table,
  ilike = { column: "", value: "" },
  eq = { column: "", value: "" }
) => {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .ilike(ilike.column, ilike.value)
      .eq(eq.column, eq.value);
    return resolve({ data, error });
  });
};

export const get = (table) =>
  new Promise(async (resolve, reject) => {
    const { data, error } = await supabase.from(table).select("*");
    return resolve({ data, error });
  });
