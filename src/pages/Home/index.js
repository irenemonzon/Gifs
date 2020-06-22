import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import getGifs from "../../services/getGifs";
import ListOfGifs from "../../components/ListOfGifs";
import { useGifs } from "../../hooks/useGifs";

const POPULAR_GIFS = ["Matrix", "Venezuela", "Chile", "Colombia", "Ecuador"];

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [path, pushLocation] = useLocation();
  const { loading, gifs } = useGifs();

  const handleSubmit = (event) => {
    event.preventDefault();
    //navegar a otra ruta
    pushLocation(`/search/${keyword}`);
  };

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search a git here..."
          onChange={handleChange}
          type="text"
          value={keyword}
        />
      </form>
      <h3 className="App-title">última búsqueda</h3>
      <ListOfGifs gifs={gifs} />
      <h3 className="App-title">Los gifs más populares</h3>
      <ul>
        {POPULAR_GIFS.map((popularGif) => (
          <li key={popularGif}>
            <Link to={`/search/${popularGif}`}>Gifs de {popularGif}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
