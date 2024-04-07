import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Comics from "./pages/Comics";
import Comic from "./pages/Comic";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
    // Vérifier si le comic n'est pas déjà en favori
    if (!favorites.find((fav) => fav._id === comic._id)) {
      let newFavorites = [...favorites];
      newFavorites.push(comic);
      setFavorites(newFavorites);
      Cookies.set("favorites", JSON.stringify(newFavorites), {
        expires: 5,
      });
    }
  };

  const handleAddToFav = (character) => {
    // Vérifier si le personnage n'est pas déjà en favori
    if (!favorites.find((fav) => fav._id === character._id)) {
      let newFav = [...favorites];
      newFav.push(character);
      setFavorites(newFav);
      Cookies.set("favorites", JSON.stringify(newFav), {
        expires: 5,
      });
    }
  };

  // const removeFromFavorites = (id) => {
  //   const updatedFavorites = favorites.filter((fav) => fav._id !== id);
  //   updatedFavorites.slice(id);
  //   setFavorites(updatedFavorites);
  //   Cookies.remove("favorites", id);
  // };

  const handleRemoveFav = (id) => {
    const fav = Cookies.get("fav");
    const tabFav = fav && JSON.parse(fav);

    let newFav = [[], []];
    for (let i = 0; i < tabFav.length; i++) {
      for (let j = 0; j < tabFav[i].length; j++) {
        if (i === 0) {
          if (tabFav[i][j] !== id) {
            newFav[0].push(tabFav[i][j]);
          }
        } else {
          if (tabFav[i][j] !== id) {
            newFav[1].push(tabFav[i][j]);
          }
        }
      }
    }
    setFavorites(newFav);
    Cookies.set("fav", JSON.stringify(newFav));
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
            element={
              <Favorites
                favorites={favorites}
                handleRemoveFav={handleRemoveFav}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
