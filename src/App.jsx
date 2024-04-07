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
  const [token, setToken] = useState(Cookies.get("token") || null);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

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

  let favoriteId = [];

  favorites.map((favorite) => {
    return favoriteId.push(favorite.id);
  });

  const handleEraseFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    Cookies.set("favorites", JSON.stringify(updatedFavorites), { expires: 10 });
  };

  return (
    <>
      <Router>
        <Header token={token} handleToken={handleToken} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/characters"
            element={
              <Characters
                setSearch={setSearch}
                search={search}
                handleAddToFav={handleAddToFav}
                favoriteId={favoriteId}
                handleEraseFromFavorites={handleEraseFromFavorites}
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
                favoriteId={favoriteId}
                handleEraseFromFavorites={handleEraseFromFavorites}
              />
            }
          />
          <Route path="/comic/:id" element={<Comic />} />
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} />}
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
