import React from "react";
import "./DriverForm.css";
import { Row, Col } from "antd";

function DriverForm() {
  return (
    <Row justify="center" align="middle" className="driver-form-row">
      <Col xs={22} sm={12} lg={6}>
        <div className="driver-form-wrapper">
          <div className="driverFormHeader">Fill Driver Info</div>
          <form action="" className="a-Form">
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
          </form>
        </div>
      </Col>
    </Row>
  );
}

export default DriverForm;
