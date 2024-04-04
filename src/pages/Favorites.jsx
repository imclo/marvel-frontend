const Favorites = ({ favorites }) => {
  return (
    <>
      <main>
        <div className="favorite-background">
          <div className="fav-title">
            <p>FAVORITES</p>
          </div>
        </div>
        <div className="card-wrapper">
          <p className="ur-fav">YOUR FAVORITES</p>
          <div className="fav-container">
            {favorites.map((elem) => {
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
            })}
            {/* <p>CHARACTERS</p>
            {favorites.map((item) => {
              return (
                <div key={item._id} className="character-card">
                  <div className="title-comic">
                    <div className="name-char">
                      <h2>{item.name}</h2>
                    </div>
                  </div>
                  <div className="picture-comic">
                    <img
                      src={item.thumbnail.path + "." + item.thumbnail.extension}
                      alt="character-marvel"
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
