import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "antd";
import { saveUser } from "../../../redux/user_action";
import Navbar from "../../../Components/Nav/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";

function Dashboard() {
  const router = useNavigate();
  const { userPayload } = useSelector((state) => state.user);
  const [dashBoardData, setDashBoardData] = useState({});
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorFetching, setErrorFetching] = useState(false);

  useEffect(() => {
    if (!userPayload.isLoggedIn) {
      router("/", { replace: true });
    }

    const { fullName } = userPayload;
    setUserName(fullName ? fullName : "there,");

    Promise.all([
      axios.get(
        "https://demoapi.remis.africa/Dashboard/CompanyOverview?startDate=2022-01-27T13%3A44%3A00.8537645Z&endDate=2023-01-27T13%3A44%3A00.8537645Z",

        {
          headers: {
            Authorization: `Bearer ${userPayload.token}`,
            accept: "*/*",
          },
        }
      ),
      axios.get("https://demoapi.remis.africa/Company/Details", {
        headers: {
          Authorization: `Bearer ${userPayload.token}`,
          accept: "*/*",
        },
      }),
    ])
      .then((res) => {
        setDashBoardData(res[0].data?.data?.dashboard);
        setUserName(res[1].data?.data?.company?.name);
      })
      .catch((e) => {
        setErrorFetching(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Row align="middle" justify="center">
        <Col xs={22} lg={18}>
          <div className="mini-nav-dash">
            <div className="dashboard-title">Dashboard</div>
            <div
              className="edit-driver"
              onClick={() => {
                router("/manage-drivers");
              }}
            >
              Edit Drivers
            </div>
          </div>
          {loading ? (
            <>Loading ...</>
          ) : errorFetching ? (
            "Oops. Error Occured"
          ) : (
            <div className="dashboard-container">
              <div className="name-container">Hey, {userName}</div>
              <div className="metrics-container">
                <Row gutter={20}>
                  <Col xs={12} lg={4}>
                    <div className="metrics-table">
                      <div className="metrics-header">Balance</div>
                      <div className="metrics-sub">{dashBoardData.balance}</div>
                    </div>
                  </Col>
                  <Col xs={12} lg={4}>
                    <div className="metrics-table">
                      <div className="metrics-header">Inflow</div>
                      <div className="metrics-sub">{dashBoardData.inflow}</div>
                    </div>
                  </Col>
                  <Col xs={12} lg={4}>
                    <div className="metrics-table">
                      <div className="metrics-header">Outflow</div>
                      <div className="metrics-sub">{dashBoardData.outflow}</div>
                    </div>
                  </Col>
                  <Col xs={12} lg={4}>
                    <div className="metrics-table">
                      <div className="metrics-header">OutflowCompare</div>

                      <div className="insub-container">
                        <div className="metrics-insub">
                          Percentage:{" "}
                          {dashBoardData?.outflowCompare?.percentage}
                        </div>
                        <div className="metrics-insub">
                          direction: {dashBoardData?.outflowCompare?.direction}
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col xs={12} lg={4}>
                    <div className="metrics-table">
                      <div className="metrics-header">InflowCompare</div>

                      <div className="insub-container">
                        <div className="metrics-insub">
                          Percentage: {dashBoardData?.inflowCompare?.percentage}
                        </div>
                        <div className="metrics-insub">
                          direction: {dashBoardData?.inflowCompare?.direction}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} lg={4}>
                    <div className="metrics-table">
                      <div className="metrics-header">Direction Sum.</div>

                      <div className="insub-container">
                        <div className="metrics-insub">
                          branches: {dashBoardData?.directorySummary?.branches}
                        </div>
                        <div className="metrics-insub">
                          groups: {dashBoardData?.directorySummary?.groups}
                        </div>
                        <div className="metrics-insub">
                          staff: {dashBoardData?.directorySummary?.staff}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} lg={4}>
                    <div className="metrics-table">
                      <div className="metrics-header">Fleet Sum.</div>

                      <div className="insub-container">
                        <div className="metrics-insub">
                          vehicles: {dashBoardData?.fleetSummary?.vehicles}
                        </div>
                        <div className="metrics-insub">
                          drivers: {dashBoardData?.fleetSummary?.drivers}
                        </div>
                        <div className="metrics-insub">
                          vouchers: {dashBoardData?.fleetSummary?.vouchers}
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col xs={12} lg={4}>
                    <div className="metrics-table">
                      <div className="metrics-header">Card Sum.</div>

                      <div className="insub-container">
                        <div className="metrics-insub">
                          total: {dashBoardData?.cardSummary?.total}
                        </div>
                        <div className="metrics-insub">
                          virtual: {dashBoardData?.cardSummary?.virtual}
                        </div>
                        <div className="metrics-insub">
                          debit: {dashBoardData?.cardSummary?.debit}
                        </div>
                        <div className="metrics-insub">
                          utility: {dashBoardData?.cardSummary?.utility}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
