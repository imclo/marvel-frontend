import Cookies from "js-cookie";
import axios from "axios";

const Favorites = () => {
  return (
    <>
      <main>
        <div className="favorite-background">
          <div className="fav-title">
            <p>FAVORITES</p>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card-container"></div>
        </div>
      </main>
    </>
  );
};

export default Favorites;
