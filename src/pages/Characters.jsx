import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import Search from "../components/Search";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/characters`);
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <main>
        <div className="card-wrapper">
          <Search />
          <div className="card-container">
            {data.results.map((character) => {
              return (
                <article className="character-card" key={character._id}>
                  <div className="name-character">
                    <h2>{character.name}</h2>
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
      </main>
    </>
  );
};

export default Characters;
