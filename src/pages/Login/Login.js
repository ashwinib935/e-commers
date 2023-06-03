import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../../context/AuthContextProvider";

function Login() {
  const { handleGuest, handleLogin, setUser, user } = useContext(AuthContext);

  return (
    <div className="login-container">
      <form className="login-card">
        <div className="login-card-header">
          <h2>Sign In</h2>
        </div>

        <div className="login-card-item">
          <label>Email address </label>
          <input
            type="email"
            className="text-input"
            placeholder="Enter email"
            required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="login-card-item">
          <label>Password </label>
          <input
            type="password"
            className="pwd-input"
            placeholder="Enter password"
            required
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className="login-card-item login-action">
          <button
            type="submit"
            className="btn1 btn-login"
            onClick={handleLogin}
          >
            Login
          </button>

          <Link to="/" className="link-guest">
            <button className="btn1 btn1-signup" onClick={handleGuest}>
              Login As A Guest
            </button>
          </Link>
          <div className="sign-up">
            <p className="">
              Don't have an account{" "}
              <Link to="/sign-up" className="sign-up-link">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
