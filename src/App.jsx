import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import Header from "./components/Header";

import Comics from "./pages/Comics";
import Comic from "./pages/Comic";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faHeart);

function App() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (Cookies.get("favorites")) {
      const favoritesCookie = JSON.parse(Cookies.get("favorites"));
      console.log(favoritesCookie);
      setFavorites(favoritesCookie);
    }
  }, []);

  const handleAddToFavorites = (comic) => {
    let newFavorites = [...favorites];
    newFavorites.push(comic);
    setFavorites(newFavorites);
    Cookies.set("favorites", JSON.stringify(newFavorites), {
      expires: 5,
    });
  };

  const handleAddToFav = (character) => {
    let newFav = [...favorites];
    newFav.push(character);
    setFavorites(newFav);
    Cookies.set("favorites", JSON.stringify(newFav), {
      expires: 5,
    });
  };

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/characters"
            element={
              <Characters
                setSearch={setSearch}
                search={search}
                handleAddToFav={handleAddToFav}
              />
            }
          />
          <Route path="/character/:id" element={<Character />} />
          <Route
            path="/comics"
            element={
              <Comics
                setSearch={setSearch}
                search={search}
                handleAddToFavorites={handleAddToFavorites}
              />
            }
          />
          <Route path="/comic/:id" element={<Comic />} />
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
