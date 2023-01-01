import { getCookie, setCookie } from "./util";

export const productCookieName = "calculated";

export function addToCalculator(product) {
  if (product && typeof product === "object" && product.id) {
    const current = getCookie(productCookieName);
    let newProduct = [product.id];
    if (current) {
      const parsed = JSON.parse(current);
      console.log("current calculator: ", { current, parsed });
      if (typeof parsed === "object") newProduct = [...parsed, product.id];
    }
    setCookie(productCookieName, JSON.stringify(newProduct));
    return newProduct;
  } else alert("Terjadi kesalahan saat menambahkan produk");
}
