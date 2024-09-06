import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../header";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to validate the email and password
  const validateForm = () => {
    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 5) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    // Handle login logic here
    if (!validateForm()) {
      return; // Stop submission if the form is not valid
    }
    let payload = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5004/api/user/login",
        payload
      );
      if (response.data.Success === true) {
        setMessage("Valid Credentials");
        localStorage.setItem("token", response.data.token);
        if (!response.data.token) {
          navigate("/");
        } else {
          navigate("/dashboard");
        }
      } else {
        setMessage("Invalid Credentials");
      }
    } catch (error) {
      console.error("There was an error!", error.message);
      setMessage("Invalid Credentials");
    }
  };

  return (
    <>
      <Header />
      <section className="login-section">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-around align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong login-box">
                <div className="card-body">
                  <h5 className="login-to-get-started-copy">
                    Login to get started
                  </h5>
                  <form onSubmit={handleLogin}>
                    <div className="form-group mb-4 mt-3">
                      <label
                        className={`label ${emailError ? "error-message" : ""}`}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {emailError && (
                        <p className="error-message">{emailError}</p>
                      )}
                    </div>
                    <div className="form-group mb-4 mt-3 position-relative">
                      <label
                        className={`label ${
                          passwordError ? "error-message" : ""
                        }`}
                      >
                        Password
                      </label>
                      <input
                        type={passwordVisible ? "text" : "password"}
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {passwordError && (
                        <p className="error-message">{passwordError}</p>
                      )}
                      <span
                        className="position-absolute end-0 top-50 me-3"
                        style={{ cursor: "pointer" }}
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? (
                          <img
                            src={
                              require("../../assets/hide-password.svg").default
                            }
                            alt="mySvgImage"
                          />
                        ) : (
                          <img
                            src={
                              require("../../assets/hide-password.svg").default
                            }
                            alt="mySvgImage"
                          />
                        )}
                      </span>
                    </div>
                    <div className="d-flex justify-content-end align-items-center mb-3">
                      <a
                        className="text-decoration-none forgot-password"
                        href="/"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="login">
                      <button type="submit" className="rectangle">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {message && <p className="message mt-3">{message}</p>}
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
