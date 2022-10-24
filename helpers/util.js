import Cookies from "js-cookie";

export const supaUrl = () => process.env.NEXT_PUBLIC_supabaseUrl;
export const supaKey = () => process.env.NEXT_PUBLIC_supabaseKeySecret;

export const setCookie = (name, value) =>
  Cookies.set(name, value, { expires: 1 });

export const getCookie = (name) => Cookies.get(name);

export const removeCookie = (name) => Cookies.remove(name);

export const slugify = (name = "") =>
  `${name}`
    .toLowerCase()
    .trim()
    .replace(",", "-")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const isFunction = (fn) => typeof fn === "function";

export const runFunction = (fn, callback) => {
  if (isFunction(fn)) fn();
  else if (isFunction(callback)) callback();
};

export const convertRupiah = (number) => {
  if (!number) return "";
  return `Rp${parseInt(number, 10)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-`;
};

export const paramsValue = (value) => encodeURIComponent(value).toLowerCase();
