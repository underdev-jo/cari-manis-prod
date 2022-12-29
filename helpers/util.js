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

export function diffDate(date) {
  if (!date) return "";
  const date1 = new Date().getTime();
  const date2 = new Date(`${date}`).getTime();
  const diff = Math.floor(date1 - date2);

  const hour = 1000 * 60 * 60;
  const day = hour * 24;
  const month = day * 30;

  const hours = Math.floor(diff / hour);
  const days = Math.floor(diff / day);
  const months = Math.floor(diff / month);

  let message = "";

  // var days = Math.floor(diff / day);
  // var months = Math.floor(days / 31);
  // var years = Math.floor(months / 12);

  // var message = date2;
  // message += " was ";
  // message += days + " days ";
  // message += months + " months ";
  // message += years + " years ago \n";

  if (days < 1) message = `${hours} jam lalu`;
  else if (days < 30) message = `${days} hari lalu`;
  else if (days >= 30) message = `${months} bulan lalu`;

  return message;
}

export function capitalize(string = "") {
  return `${`${string}`.charAt(0).toUpperCase()}${`${string}`.slice(1)}`;
}

const helper = { capitalize, diffDate, slugify };
export default helper;
