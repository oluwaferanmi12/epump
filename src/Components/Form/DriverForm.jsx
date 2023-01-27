import React from "react";
import "./DriverForm.css";
import { Row, Col } from "antd";

function DriverForm() {
  return (
    <Row justify="center" align="middle" className="driver-form-row">
      <Col xs={22} sm={12} lg={8}>
        <div className="driver-form-wrapper">
          <div className="driverFormHeader">Fill Driver Info</div>
          <form action="">
            <div>
              <input type="text" />
            </div>
          </form>
        </div>
      </Col>
    </Row>
  );
}

export default DriverForm;
