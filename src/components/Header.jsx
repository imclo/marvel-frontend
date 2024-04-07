import logo from "../assets/img/logo-marvel.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = ({ token, handleToken }) => {
  let location = useLocation();
  console.log(location);

  return (
    <>
      <header>
        <div className="header-container">
          <Link to="/">
            <img className="logo" src={logo} alt="marvel-logo" />
          </Link>
          <div className="header-buttons">
            {!token && (
              <Link to="/signup">
                <button className="signup">Sign up</button>
              </Link>
            )}
            {token ? (
              <button
                className="logout"
                onClick={() => {
                  handleToken(null);
                }}
              >
                Log out
              </button>
            ) : (
              <Link to="/login">
                <button className="login">Log in</button>
              </Link>
            )}
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
