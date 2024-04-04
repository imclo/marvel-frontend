import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

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
        </div>
        <div className="card-wrapper">
          <Search setSearch={setSearch} search={search} />
          <div className="card-container">
            {data.results.map((comic) => {
              return (
                <article className="comic-card" key={comic._id}>
                  <div className="title-comic">
                    <h2>{comic.title}</h2>
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
