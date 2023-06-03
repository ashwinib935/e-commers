import React, { createContext, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";
export const AuthContext = createContext();
function AuthContextProvider({ children }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [token, setToken] = useState("");
  const [isLogined, setIsLogined] = useState(false);
  const [signupUser, setSignupUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const addUserLogined = async (user) => {
    if (user.email && user.password) {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const result = await response.json();
        localStorage.setItem("encodedToken", result.encodedToken);
        localStorage.setItem("user", JSON.stringify(result.foundUser));
        if (result.encodedToken) {
          setToken(result.encodedToken);
          setIsLogined(true);
          const newPath = location?.state?.from?.pathname;
          if (newPath === "/login") {
            navigate("/products");
            toast.success("Login Successfully!");
          } else if (newPath === undefined) {
            navigate("/products");
            toast.success("Login Successfully!");
          } else {
            navigate(newPath);
            toast.success("Login Successfully!");
          }
        } else {
          setIsLogined(false);
        }
      } catch (error) {
        console.log(error);
        setIsLogined(false);
      }
    } else {
      toast.error("Email and Password should not be empty.");
    }
  };

  const addUserSignup = async (signupUser) => {
    if (signupUser.email && signupUser.password) {
      try {
        const response = await axios.post(`/api/auth/signup`, signupUser);
        localStorage.setItem("encodedToken", response.data.encodedToken);
        localStorage.setItem("user", JSON.stringify(response.data.createdUser));
        const result = response.data;
        console.log("result:", result);
        if (result.encodedToken) {
          setToken(result.encodedToken);
          setIsLogined(true);
          const newPath = location?.state?.from?.pathname;

          console.log(newPath, "newPath");
          if (newPath === "/login") {
            navigate("/products");
            toast.success("Login Successfully!");
          } else if (newPath === undefined) {
            navigate("/products");
            toast.success("Login Successfully!");
          } else {
            navigate(newPath);
            toast.success("Login Successfully!");
          }
        } else {
          setIsLogined(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Email and Password should not be empty.");
    }
  };

  const handleGuest = () => {
    addUserLogined({
      email: "adarshbalika@gmail.com",
      password: "adarshbalika",
    });
  };
  const handleLogin = (event) => {
    event.preventDefault();
    if (user.email && user.password) {
      if (validator.isEmail(user.email)) {
        addUserLogined(user);
      } else {
        toast.error("Please enter valid email.");
      }
    } else {
      toast.error("Email and Password should not be empty.");
    }
    return false;
  };
  const handleSignup = (event, signupUser) => {
    event.preventDefault();
    if (
      signupUser.firstName &&
      signupUser.lastName &&
      signupUser.email &&
      signupUser.password
    ) {
      if (validator.isEmail(signupUser.email)) {
        addUserSignup(signupUser);
      } else {
        toast.error("Please enter valid email.");
      }
    } else {
      toast.error("Fields should not be empty");
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        handleGuest,
        handleLogin,
        isLogined,
        setIsLogined,
        setUser,
        user,
        token,
        setToken,
        handleSignup,
        setSignupUser,
        signupUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
