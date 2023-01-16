import { runFunction } from "helpers/util";
import { useEffect, useState } from "react";

export default function useFetch(act) {
  const [isFetch, setFetch] = useState(false);

  useEffect(() => {
    if (isFetch) {
      console.info("RUN ONCE");
      runFunction(act);
    } else setFetch(true);
  }, [isFetch, act]);
}
