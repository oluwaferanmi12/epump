import React, { useState, useEffect } from "react";
import { Store } from "../context/store";
import Navbar from "../Components/Nav/Navbar";
import "./Home.css";
import { Row, Col } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveCompany, saveUser } from "../redux/user_action";
import { useNavigate } from "react-router-dom";

function Home() {
  const router = useNavigate();
  const { userPayload } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (userPayload.isLoggedIn) {
      router("/dashboard", { replace: true });
    }
  }, []);

  const handleCompanyData = (token, userData) => {
    axios
      .get("https://demoapi.remis.africa/Company/Details", {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
      })
      .then((res) => {
        dispatch(saveCompany(res.data));
        dispatch(saveUser({ isLoggedIn: true, ...userData }));
        setSuccess("User Authorised");
        setTimeout(() => {
          router("/dashboard", { replace: true });
        }, 3000);
      })
      .catch((e) => setError("Oops could not login"));
  };

  const handleLogin = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (
      data.email != "green@siga.33mail.com" &&
      data.password != "#Move0n.com#"
    ) {
      setLoading(false);
      setError("Incorrect Credentials");
      return;
    }

    axios
      .post("https://demoapi.remis.africa/Login", data)
      .then((res) => {
        handleCompanyData(res.data.token, res.data);
        
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
        setError("");
      });
  };

  return (
    <>
      <Navbar />

      <Row justify="center" align="middle">
        <Col xs={22} lg={8}>
          <div className="form-container">
            <form action="" style={{ width: "100%" }} onSubmit={handleLogin}>
              <div className="">
                <div className="label">Username/Email</div>
                <input
                  name="email"
                  className="data-input"
                  type="text"
                  placeholder="Enter email or userName"
                />
              </div>

              <div>
                <div className="label">Password</div>

                <input
                  name="password"
                  className="data-input"
                  type="text"
                  placeholder="Password"
                />
              </div>

              <div className="submit-container">
                <input className="submit-input" type="submit" value="Submit" />
              </div>
              <div className="response-message">
                {success && <div className="success-class">{success}</div>}
                {error && <div className="error-class">{error}</div>}
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Home;
