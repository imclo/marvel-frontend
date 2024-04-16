import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(email, password, username);
    try {
      setErrorMessage("");
      const response = await axios.post(
        `https://site--marvel-backend--47xhmxvzybsz.code.run/user/signup`,
        {
          username,
          email,
          password,
        }
      );
      handleToken(response.data.token);
      navigate("/");

      console.log(response.data);
    } catch (error) {
      if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Please fill in all fields");
      } else if (error.response.status === 409) {
        setErrorMessage(
          "This email already has an account, please use another one 🙂 "
        );
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Sign up</h2>
      <form className="form-signup" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>

        <input className="btn-valid" value="Sign up" type="submit" />
        {errorMessage && (
          <p className="email-used" style={{ color: "red" }}>
            {errorMessage}
          </p>
        )}
        <Link to="/login" style={{ textDecoration: "none" }}>
          <p className="lien-signup">Already a member? Log-in!</p>
        </Link>
      </form>
    </div>
  );
};
export default Signup;
