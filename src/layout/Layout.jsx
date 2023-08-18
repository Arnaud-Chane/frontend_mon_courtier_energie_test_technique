import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

import { UserInfoContext } from "../context/UserRoleContext";

export default function Root() {
  const { userInfo } = useContext(UserInfoContext);

  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    if ("token" in window.localStorage) {
      setShowNavbar(true);
    }
  }, [userInfo.role]);

  return (
    <>
      {showNavbar && <Navbar />}
      <main>
        <Outlet />
      </main>
    </>
  );
}
