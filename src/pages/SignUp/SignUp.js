import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { AuthContext } from "../../context/AuthContextProvider";
function SignUp() {
  const { handleSignup, signupUser, setSignupUser, setUser, user } =
    useContext(AuthContext);
  return (
    <div className="signup-container">
      <form className="signup-card">
        <div className="signup-card-header">
          <h2>Sign Up</h2>
        </div>

        <div className="signup-card-item">
          <label>First name</label>
          <input
            type="text"
            className="text-input"
            placeholder="First name"
            required
            onChange={(e) =>
              setSignupUser({ ...signupUser, firstName: e.target.value })
            }
          />
        </div>
        <div className="signup-card-item">
          <label>Last name</label>
          <input
            type="text"
            className="text-input"
            placeholder="Last name"
            required
            onChange={(e) =>
              setSignupUser({ ...signupUser, lastName: e.target.value })
            }
          />
        </div>
        <div className="signup-card-item">
          <label>Email address</label>
          <input
            type="email"
            className="text-input"
            placeholder="Enter email"
            required
            onChange={(e) =>
              setSignupUser({ ...signupUser, email: e.target.value })
            }
          />
        </div>
        <div className="signup-card-item">
          <label>Password</label>
          <input
            type="password"
            className="pwd-input"
            placeholder="Enter password"
            required
            onChange={(e) =>
              setSignupUser({ ...signupUser, password: e.target.value })
            }
          />
        </div>
        <div className="signup-card-item">
          <button
            type="submit"
            className="btn-signup"
            onClick={(event) => handleSignup(event, signupUser)}
          >
            Sign Up
          </button>
        </div>
        <p className="">
          Already registered{" "}
          <Link to="/login" className="signin-link">
            sign in?
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
