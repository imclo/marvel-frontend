import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Search from "../components/Search";
import Pagination from "../components/Pagination";

const Characters = ({ handleAddToFav }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/characters?limit=${limit}&skip=${skip}&name=${search}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [skip, search]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <main>
        <div className="characters-background">
          <div className="characters-title">
            <p>MARVEL CHARACTERS</p>
          </div>
          <Search setSearch={setSearch} search={search} />
        </div>
        <div className="card-wrapper">
          <div className="card-container">
            {data.results.map((character) => {
              return (
                <article className="character-card" key={character._id}>
                  <div
                    onClick={() => {
                      handleAddToFav(character);
                    }}
                  >
                    <FontAwesomeIcon
                      className="icon-heart"
                      icon="fa-solid fa-heart"
                    />
                  </div>
                  <div className="name-character">
                    <div className="name-char">
                      <h2>{character.name}</h2>
                    </div>
                  </div>
                  <Link to={`/character/${character._id}`}>
                    <div className="picture-characters">
                      <img
                        src={
                          character.thumbnail.path +
                          "." +
                          character.thumbnail.extension
                        }
                        alt="characters-marvel"
                      />
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
        <Pagination
          skip={skip}
          setSkip={setSkip}
          count={data.count}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </main>
    </>
  );
};

export default Characters;
