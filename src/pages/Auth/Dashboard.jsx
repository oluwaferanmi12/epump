import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveUser } from "../../redux/user_action";
import Navbar from "../../Components/Nav/Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const router = useNavigate();
  const { userPayload } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userPayload.isLoggedIn) {
      router("/", { replace: true });
    }
  }, []);

  const dispatch = useDispatch();

  console.log(userPayload);

  return (
    <>
      <Navbar />
      <div
        onClick={() => {
          dispatch(saveUser());
        }}
      >
        This is the Dashboard
      </div>
    </>
  );
}

export default Dashboard;
