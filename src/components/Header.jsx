import logo from "../assets/img/logo-marvel.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <div className="header-container">
          <Link to="/">
            <img className="logo" src={logo} alt="marvel-logo" />
          </Link>
          <div className="header-buttons">
            <Link to="/characters">
              <button className="characters">Characters</button>
            </Link>
            <Link to="/comics">
              <button className="comics">Comics</button>
            </Link>
            <Link to="/favorites">
              <button className="favorites">Favorites</button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
