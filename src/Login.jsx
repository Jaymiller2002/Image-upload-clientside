import React, { useContext, useState } from "react";
import { AuthContext } from "./context";
import { getToken } from "./api";
import CreateNewUser from "./CreateNewUser";
import "./App.css"; // Import the CSS file
import { Link } from "react-router-dom";

function Login() {
  const { auth } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    getToken({ auth, username, password });
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <div className="input-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn-submit" onClick={submit}>
        Submit
      </button>

      <hr />
        <button className="CreateButton"><Link to='/CreateNewUser'>Create User</Link></button>
        {/* <CreateNewUser /> */}
    </div>
  );
}

export default Login;
