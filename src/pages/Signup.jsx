import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    if (!value.includes("@")) {
      setError("Email doit contenir le symbole '@'");
    } else {
      setError("");
    }
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--marvel-backend--47xhmxvzybsz.code.run/user/signup",

        {
          email: email,
          username: username,
          password: password,
        }
      );

      handleToken(response.data.token);
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);

      if (error.response.status === 409) {
        setError("This email already as an account, please use another one");
      } else if (error.response.data.message === "Missing parameters") {
        setError("Please fill in all the fields");
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
          name="username"
          value={username}
          onChange={handleUsernameChange}
        ></input>
        <input
          type="email"
          placeholder="Email"
          name="mail"
          value={email}
          onChange={handleEmailChange}
        ></input>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        ></input>

        <button className="btn-valid" type="submit">
          Sign up
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Link to="/login" style={{ textDecoration: "none" }}>
          <p className="lien-signup">Already a member? Log-in!</p>
        </Link>
      </form>
    </div>
  );
};
export default Signup;
