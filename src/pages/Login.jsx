import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage("");
      const response = await axios.post(
        `https://site--marvel-backend--47xhmxvzybsz.code.run/user/login`,
        {
          email,
          password,
        }
      );
      handleToken(response.data.token);
      navigate("/");
      //   console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="form-container">
      <h2>Log in</h2>
      <form className="form-signup" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <div>
          <input className="btn-valid" value="Log in" type="submit" />
          {errorMessage && (
            <p className="email-used" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}
        </div>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <p className="lien-signup">Are you new? Sign-up!</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
