import { getCookie, setCookie } from "./util";

export const productCookieName = "calculated";

export function addToCalculator(product, substract = false) {
  if (product && typeof product === "object" && product.id) {
    const currentProduct = getCookie(productCookieName);
    let newProduct = [{ id: product.id, c: 1 }];

    if (currentProduct) {
      const parsed = JSON.parse(currentProduct);

      if (typeof parsed.product === "object") {
        const targetProduct = parsed.product.filter((i) => i.id === product.id);
        const otherProduct = parsed.product.filter((i) => i.id !== product.id);
        const hasTarget = targetProduct.length > 0;
        let c = 1;
        if (hasTarget) {
          let operation = targetProduct[0].c + 1;
          if (substract) operation = targetProduct[0].c - 1;
          c = operation;
        }

        newProduct = [...otherProduct, { id: product.id, c }];
      }
    }

    let totalProduct = newProduct.reduce((prev, curr) => {
      return { c: prev.c + curr.c };
    });

    const productObj = {
      product: newProduct,
      total: totalProduct.c || totalProduct,
    };

    setCookie(productCookieName, JSON.stringify(productObj));

    return productObj;
  } else alert("Terjadi kesalahan saat menambahkan produk");
}

export function subCalculator(product) {
  return addToCalculator(product, true);
}

export function delItemCalculator(product) {
  if (product && typeof product === "object" && product.id) {
    const currentProduct = getCookie(productCookieName);

    if (currentProduct) {
      const parsed = JSON.parse(currentProduct);
      if (typeof parsed.product === "object") {
        const newProduct = parsed.product.filter((i) => i.id !== product.id);

        let totalProduct = newProduct.reduce((prev, curr) => {
          return { c: prev.c + curr.c };
        });

        const productObj = {
          product: newProduct,
          total: totalProduct.c || totalProduct,
        };

        setCookie(productCookieName, JSON.stringify(productObj));
      }
    }
  }
}
