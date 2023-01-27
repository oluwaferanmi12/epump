import React, { useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { saveUser } from "../../redux/user_action";


function Dashboard() {
  const {userPayload} = useSelector(state => state.user);
  
  const dispatch = useDispatch();
  
  console.log(userPayload)
  
  return (
    <>
      <div onClick={() => {
        dispatch(saveUser())
      } } >This is the Dashboard</div>
    </>
  );
}

export default Dashboard;
