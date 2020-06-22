import { useContext, useState, useEffect } from "react";
import getGifs from "../services/getGifs";
import GifsContext from "../context/GifsContext";

export function useGifs({ keyword } = { keyword: null }) {
  const [loading, setLoading] = useState(false);
  const { gifs, setGifs } = useContext(GifsContext);

  useEffect(
    function () {
      setLoading(true);
      //recuperamos las keyword del localstorage
      const keywordToUse =
        keyword || localStorage.getItem("lastKeyword") || "random";
      getGifs({ keyword: keywordToUse }).then((gifs) => {
        setGifs(gifs);
        setLoading(false);
        //guardamos la keyword en el localstorage
        localStorage.setItem("lastKeyword", keyword);
      });
    },
    [keyword, setGifs]
  );
  return { loading, gifs };
}
