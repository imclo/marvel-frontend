import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";

import Comics from "./pages/Comics";
import Comic from "./pages/Comic";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/characters"
            element={<Characters setSearch={setSearch} search={search} />}
          />
          <Route path="/character/:id" element={<Character />} />
          <Route
            path="/comics"
            element={<Comics setSearch={setSearch} search={search} />}
          />
          <Route path="/comic/:id" element={<Comic />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
