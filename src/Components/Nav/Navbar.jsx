import React, { useContext, useEffect } from "react";
import { Store } from "../../context/store";

function Navbar() {
  const { userPayload, setUserPayload } = useContext(Store);

  useEffect(() => {
    setUserPayload("David");
  }, []);

  return <div>This is the navbar</div>;
}

export default Navbar;
