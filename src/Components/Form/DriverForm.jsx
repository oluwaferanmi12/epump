import React, { useState, useEffect } from "react";
import "./DriverForm.css";
import { v4 as genId } from "uuid";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";

function DriverForm({ handleClose, handleRefresh }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { companyPayload } = useSelector((state) => state.company);
  const { userPayload } = useSelector((state) => state.user);
  const companyId = companyPayload.data.company.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = Object.fromEntries(new FormData(e.target));
    const { email, city, address, name, phone, altPhoneNumber, state } = data;
    if (
      !email &&
      !city &&
      !address &&
      !name &&
      !phone &&
      !altPhoneNumber &&
      !state
    ) {
      setError("Incorrect Credential");
      setLoading(false);
      return;
    }

    data.roles = ["driver"];
    data.companyId = companyId;

    data.userId = genId();

    axios
      .post(`https://demoapi.remis.africa/Driver/Add/${companyId}`, data, {
        headers: {
          Authorization: `Bearer ${userPayload.token}`,
          accept: "*/*",
        },
      })
      .then((res) => {
        handleRefresh(true);
        handleClose(false);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Row justify="center" align="middle" className="driver-form-row">
      <Col xs={22} sm={12} lg={6}>
        <div className="driver-form-wrapper">
          <div className="driverFormHeader">Fill Driver Info</div>
          <form action="" className="a-Form" onSubmit={handleSubmit}>
            <div>
              <div className="input-head">Name</div>
              <input
                className="driver-input"
                type="text"
                name="name"
                placeholder="Enter name"
              />
            </div>
            <div>
              <div className="input-head">Phone</div>
              <input
                className="driver-input"
                type="text"
                name="phone"
                placeholder="Enter Phone number"
              />
            </div>
            <div>
              <div className="input-head">Alt Phone</div>
              <input
                className="driver-input"
                type="text"
                name="altPhoneNumber"
                placeholder="Enter Alternative Number"
              />
            </div>
            <div>
              <div className="input-head">Email</div>
              <input
                className="driver-input"
                type="text"
                name="email"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <div className="input-head">Address</div>
              <input
                className="driver-input"
                type="text"
                name="address"
                placeholder="Enter address"
              />
            </div>
            <div>
              <div className="input-head">City</div>
              <input
                className="driver-input"
                type="text"
                name="city"
                placeholder="Enter city"
              />
            </div>
            <div>
              <div className="input-head">State</div>
              <input
                className="driver-input"
                type="text"
                name="state"
                placeholder="Enter state"
              />
            </div>

            <div className="submit-wrapper">
              <div>
                <input
                  value={loading ? "Submitting..." : "Submit"}
                  disabled={loading}
                  type="submit"
                  className="submit-button"
                />
              </div>
              <div
                className="close"
                onClick={() => {
                  handleClose(false);
                }}
              >
                close
              </div>
            </div>
            <div className="error">{error && "Incorrect credential"}</div>
          </form>
        </div>
      </Col>
    </Row>
  );
}

export default DriverForm;
