import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Character = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState([]);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fechData = async () => {
      try {
        const characterResponse = await axios.get(
          `http://localhost:3000/character/${id}`
        );
        const comicsResponse = await Promise.all(
          characterResponse.data.comics.map((comicId) =>
            axios.get(`http://localhost:3000/comic/${comicId}`)
          )
        );
        setData(characterResponse.data);
        setComics(comicsResponse.map((response) => response.data));

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fechData();
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <div className="card-wrapper">
        <div className="hero-card">
          <p className="hero-name">{data.name}</p>
          <p className="hero-description">{data.description}</p>
          <div className="css-background">
            <img
              src={data.thumbnail.path + "." + data.thumbnail.extension}
              alt="characters-marvel"
            />
          </div>
        </div>
        <div className="card-container">
          {data.title}
          {comics.map((comic) => (
            <div className="comic-card" key={comic._id}>
              <div className="title-comic">
                <h2>{comic.title}</h2>
              </div>
              <div className="picture-comic">
                <img
                  src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                  alt="comic-title"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Character;
