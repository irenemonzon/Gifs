import React, { useState, useEffect, useRef } from "react";
import getTrendingTerms from "../../services/getTrendingTermsService";
import Category from "../Category";

function TrendingSeach() {
  const [trends, setTrends] = useState([]);

  useEffect(function () {
    getTrendingTerms().then(setTrends);
  }, []);

  return <Category name="Tendencias" options={trends} />;
}
export default function LazyTrending() {
  const [show, setShow] = useState(false);
  const elementRef = useRef();

  useEffect(function () {
    const onChange = (entries, observer) => {
      const el = entries[0];
      console.log(el.isIntersecting);
      if (el.isIntersecting) {
        setShow(true);
        observer.disconnect();
      }
    };

    const observer = new IntersectionObserver(onChange, {
      rootMargin: "100px",
    });
    observer.observe(elementRef.current);
    return () => observer.disconnect();
  });
  return <div ref={elementRef}>{show ? <TrendingSeach /> : null}</div>;
}
