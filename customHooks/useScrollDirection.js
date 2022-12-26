import { useEffect, useState } from "react";

let lastScroll = 0;

export default function useScrollDirection() {
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    const fn = () => {
      let st = Math.abs(
        window.pageYOffset || document.documentElement.scrollTop
      );
      if (st > lastScroll) setDirection("down");
      else setDirection("up");

      lastScroll = st <= 0 ? 0 : st;
    };

    window.addEventListener("scroll", fn);

    return () => {
      window.removeEventListener("scroll", fn);
    };
  }, [direction]);

  return direction;
}
