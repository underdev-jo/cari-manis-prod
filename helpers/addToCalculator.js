import { getCookie, setCookie } from "./util";

export const productCookieName = "calculated";

export function addToCalculator(product) {
  if (product && typeof product === "object" && product.id) {
    const currentProduct = getCookie(productCookieName);
    let newProduct = [{ id: product.id, count: 1 }];

    if (currentProduct) {
      const parsed = JSON.parse(currentProduct);

      if (typeof parsed.product === "object") {
        const targetProduct = parsed.product.filter((i) => i.id === product.id);
        const otherProduct = parsed.product.filter((i) => i.id !== product.id);
        const hasTarget = targetProduct.length > 0;

        const count = hasTarget ? targetProduct[0].count + 1 : 1;
        newProduct = [...otherProduct, { id: product.id, count }];
      }
    }

    let totalProduct = newProduct.reduce((prev, curr) => {
      return { count: prev.count + curr.count };
    });

    const productObj = {
      product: newProduct,
      total: totalProduct.count || totalProduct,
    };

    setCookie(productCookieName, JSON.stringify(productObj));

    return productObj;
  } else alert("Terjadi kesalahan saat menambahkan produk");
}
