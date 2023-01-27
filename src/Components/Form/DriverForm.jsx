import React, { useState, useEffect } from "react";
import "./DriverForm.css";
import {v4 as genId} from "uuid"
import { Row, Col } from "antd";

function DriverForm() {
    console.log(genId())
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("")
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
    data.companyId = "";
    data.userId = genId()
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
              <div className="close">close</div>
            </div>
            <div className="error">
                {error && "Incorrect credential"}
            </div>
          </form>
        </div>
      </Col>
    </Row>
  );
}

export default DriverForm;
