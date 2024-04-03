import Characters from "./Characters";

const Home = () => {
  return (
    <>
      <main>
        <div className="picture-background">
          <div className="hero-container">
            <div className="hero-title">
              <p>Welcome to Marvel Universe!</p>
            </div>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card-container">
            <Characters />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
