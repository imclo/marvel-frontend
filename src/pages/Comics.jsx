import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Search from "../components/Search";
import Pagination from "../components/Pagination";

const Comics = () => {
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
          `http://localhost:3000/comics?limit=${limit}&skip=${skip}&title=${search}`
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
                  <FontAwesomeIcon
                    className="icon-heart"
                    icon="fa-solid fa-heart"
                    onClick={() => {
                      //data id => string
                      const newFavoriteId =
                        JSON.stringify(data._id) + "-character";
                      // change cookie string
                      console.log(
                        "sticker, fav avant: ",
                        Cookies.get("favorites")
                      );
                      const newFavorites =
                        Cookies.get("favorites") === undefined
                          ? ""
                          : Cookies.get("favorites") + newFavoriteId + " ; ";
                      // change cookie string
                      Cookies.set("favorites", newFavorites);
                    }}
                  />
                  <div className="title-comic">
                    <div className="name-char">
                      <h2>{comic.title}</h2>
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
