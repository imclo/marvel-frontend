import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Comic = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--47xhmxvzybsz.code.run/comic/${id}`
        );

        setData(response.data);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <div className="card-wrapper">
        <div className="card-container">
          <div className="hero-card">
            <p className="comic-name">{data.title}</p>
            <p className="hero-description">{data.description}</p>
            <div className="css-background">
              <img
                src={data.thumbnail.path + "." + data.thumbnail.extension}
                alt="characters-marvel"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Comic;
