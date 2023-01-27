import React, { useState, useEffect } from "react";
import Navbar from "../../../Components/Nav/Navbar";
import { Row, Col } from "antd";
import "./manage.css";
import "../Dashboard/dashboard.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import DriverForm from "../../../Components/Form/DriverForm";

function Manage() {
  const { userPayload } = useSelector((state) => state.user);
  const { companyPayload } = useSelector((state) => state.company);
  const [driversList, setDriversList] = useState([]);
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refetchData, setRefetchData] = useState(false);
  const router = useNavigate();
  const companyId = companyPayload.data.company.id;
  const [deleteIndicator, setDeleteIndicator] = useState(false);
  const [currentIndex , setCurrentIndex] = useState(-1)

  const handleDelete = (driverId , currentIndex) => {
    setDeleteIndicator(true);
    axios
      .delete(
        `https://demoapi.remis.africa/Driver/Delete/${companyId}/${driverId}`,
        {
          headers: {
            Authorization: `Bearer ${userPayload.token}`,
            accept: "*/*",
          },
        }
      )
      .then((res) => {
        setRefetchData(true);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setDeleteIndicator(false);
      });
  };

  useEffect(() => {
    if (!userPayload.isLoggedIn) {
      router("/", { replace: true });
    }

    axios
      .get(
        "https://demoapi.remis.africa/Drivers/All?count=false&companyId=afbb88d4-cd29-4509-aaf3-47321f69f34b",
        {
          headers: {
            Authorization: `Bearer ${userPayload.token}`,
            accept: "*/*",
          },
        }
      )
      .then((res) => {
        setDriversList(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [refetchData]);

  return (
    <>
      <Navbar />
      {showAddDriver && (
        <DriverForm
          handleRefresh={setRefetchData}
          handleClose={setShowAddDriver}
        />
      )}
      <Row align={"middle"} justify={"center"}>
        <Col xs={22} lg={18}>
          <div className="mini-nav-dash">
            <div className="dashboard-title">Manage Drivers</div>

            <div
              className="edit-driver"
              onClick={() => {
                setShowAddDriver(true);
              }}
            >
              Add Driver
            </div>
            <div
              className="edit-driver"
              onClick={() => {
                router("/dashboard");
              }}
            >
              Go to Dashboard
            </div>
          </div>

          <div className="dashboard-container">
            {loading ? (
              <>Loading...</>
            ) : driversList.length ? (
              <>
                <div className="manageDriverHeader">Driver List</div>
                <Row gutter={20}>
                  {driversList.map((item, index) => {
                    return (
                      <Col xs={12} lg={6} key={index}>
                        <div className="metrics-table">
                          <div className="metrics-header">{item.name}</div>

                          <div className="insub-container">
                            <div className="metrics-insub">
                              phone: {item.phone}
                            </div>
                            <div className="metrics-insub">
                              code: {item.code}
                            </div>
                            <div className="metrics-insub">
                              address: {item?.address ? item.address : "Nil"}
                            </div>
                            <div className="metrics-insub">
                              email: {item?.email ? item.email : "Nil"}
                            </div>
                            <div className="metrics-insub">
                              vehicleAssigned:{" "}
                              {item?.vehicleAssigned ? "Yes" : "Nil"}
                            </div>
                            <div className="metrics-insub">
                              status: {item?.status ? "Active" : "Nil"}
                            </div>
                          </div>

                          <div className="delete-wrapper">
                            <div
                              className="delete_button"
                              onClick={() => {
                                handleDelete(item.id);
                                setCurrentIndex(index)
                              }}
                            >
                              {deleteIndicator && currentIndex == index ? "Deleting" : `Delete ${item.name}`}
                            </div>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </>
            ) : (
              <div>Oops , Couldn't fetch data at the moment</div>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Manage;
