import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Search from "../components/Search";
import Pagination from "../components/Pagination";

const titleLenght = (text, maxLenght) => {
  return text.length > maxLenght ? text.slice(0, maxLenght) + "..." : text;
};

const Comics = ({
  handleAddToFavorites,
  handleEraseFromFavorites,
  favoriteId,
}) => {
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
          `https://site--marvel-backend--47xhmxvzybsz.code.run/comics?limit=${limit}&skip=${skip}&title=${search}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [skip, search]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <main>
        <div className="comics-background">
          <div className="characters-title">
            <p>COMICS COLLECTION</p>
          </div>
          <Search setSearch={setSearch} search={search} />
        </div>
        <div className="card-wrapper">
          <div className="card-container">
            {data.results.map((comic) => {
              return (
                <article className="comic-card" key={comic._id}>
                  <div
                    onClick={() => {
                      if (favoriteId.find((id) => id === comic._id)) {
                        handleEraseFromFavorites(comic._id);
                      } else {
                        handleAddToFavorites(comic);
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      className="icon-heart"
                      icon="fa-solid fa-heart"
                    />
                  </div>
                  <div className="title-comic">
                    <div className="name-char">
                      <h2>{titleLenght(comic.title, 25)}</h2>
                    </div>
                  </div>
                  <Link to={`/comic/${comic._id}`}>
                    <div className="picture-comic">
                      <img
                        src={
                          comic.thumbnail.path + "." + comic.thumbnail.extension
                        }
                        alt=""
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

export default Comics;
