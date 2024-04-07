import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const titleLenght = (text, maxLenght) => {
  return text.length > maxLenght ? text.slice(0, maxLenght) + "..." : text;
};

const nameLenght = (text, maxLenght) => {
  return text.length > maxLenght ? text.slice(0, maxLenght) + "..." : text;
};

const Favorites = ({ favorites, removeFromFavorites }) => {
  const characters = [];
  const comics = [];

  // Séparer les comics des personnages
  favorites.forEach((elem) => {
    if (elem.title) {
      comics.push(elem); // S'il a un titre, c'est un comic
    } else if (elem.name) {
      characters.push(elem); // S'il a un nom, c'est un personnage
    }
  });

  return (
    <>
      <main>
        <div className="favorite-background">
          <div className="fav-title">
            <p>FAVORITES</p>
          </div>
        </div>
        <div className="card-wrapper">
          {characters.length === 0 && comics.length === 0 ? (
            <p className="ur-fav">NO FAVORITE YET</p>
          ) : (
            <p className="ur-fav">YOUR FAVORITES</p>
          )}
          <div className="fav-container">
            <h3>Characters</h3>
            <div className="character-row">
              {/* Afficher les personnages */}
              {characters.map((elem) => (
                <div key={elem._id} className="character-card">
                  <div
                    onClick={() => {
                      removeFromFavorites(elem);
                    }}
                  >
                    <FontAwesomeIcon
                      className="icon-heart"
                      icon="fa-solid fa-heart"
                    />
                  </div>
                  <div className="name-character">
                    <h2>{nameLenght(elem.name, 19)}</h2>
                  </div>
                  <div className="picture-characters">
                    <img
                      src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                      alt="character-marvel"
                    />
                  </div>
                </div>
              ))}
            </div>
            <h3>Comics</h3>
            <div className="comic-row">
              {/* Afficher les comics */}
              {comics.map((elem) => (
                <div key={elem._id} className="comic-card">
                  <FontAwesomeIcon
                    className="icon-heart"
                    icon="fa-solid fa-heart"
                  />
                  <div className="title-comic">
                    <h2>{titleLenght(elem.title, 19)}</h2>
                  </div>
                  <div className="picture-comic">
                    <img
                      src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                      alt="comic-marvel"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* {favorites.map((elem) => {
              // console.log(elem);

              return (
                <div key={elem._id} className="comic-card">
                  <div className="title-comic">
                    <div className="name-char">
                      <h2>{elem.title}</h2>
                      <h2>{elem.name}</h2>
                    </div>
                  </div>
                  <div className="picture-comic">
                    <img
                      src={elem.thumbnail.path + "." + elem.thumbnail.extension}
                      alt="comic-marvel"
                    />
                  </div>
                </div>
              );
            })} */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Favorites;
