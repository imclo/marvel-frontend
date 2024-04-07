import avengers from "../assets/img/marvel-characters.avif";
import galaxy from "../assets/img/marvel-avenger.jpeg";
import comics from "../assets/img/comics.jpeg";
import marvelComics from "../assets/img/marvel-comics.jpeg";

import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <>
      <main>
        <div className="picture-background">
          <div className="hero-container">
            <div className="hero-title">
              <p>WELCOME TO OUR UNIVERSE!</p>
            </div>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="home-container">
            <div className="marvel-img">
              <div className="home-imgs">
                <img className="avengers" src={avengers} alt="" />
                <img className="avengers-img" src={galaxy} alt="" />
              </div>
              <div className="home-imgs">
                <img className="comics" src={marvelComics} alt="" />
                <img className="comics-img" src={comics} alt="" />
              </div>
            </div>
            <div className="home-buttons">
              <Link to="/characters">
                <button>Characters</button>
              </Link>
              <Link to="/comics">
                <button>Comics</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
