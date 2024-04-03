import { useState, useEffect } from "react";
import axios from "axios";

import Search from "../components/Search";

import { Link } from "react-router-dom";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comics`);
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
      </main>
    </>
  );
};

export default Comics;
