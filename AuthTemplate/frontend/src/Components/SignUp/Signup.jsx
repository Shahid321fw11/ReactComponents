import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/Images/draw1.png";
import axios from "axios";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      userName: userName,
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8000/user/signup", data)
      .then((res) => {
        console.log("res", res);
        localStorage.clear();
        localStorage.setItem("Token", JSON.stringify(res.data.token));
        navigate("/login");
      })
      .catch((err) => {
        console.log("err", err);
      });

    console.log(data, "data");
    setUserName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              value={userName}
                              onChange={(e) => {
                                setUserName(e.target.value);
                              }}
                              type="text"
                              className="form-control"
                              placeholder="Please Enter Your Name"
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                              type="email"
                              className="form-control"
                              placeholder="Please Enter Your Email"
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                              type="password"
                              className="form-control"
                              placeholder="Please Enter Your Password"
                            />
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          Already a register User
                          <Link to="/login" style={{ textDecoration: "none" }}>
                            Sign In
                          </Link>
                          {/* <a href="">Sign In</a> */}
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src={logo} className="img-fluid" alt="Sampleimage" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
