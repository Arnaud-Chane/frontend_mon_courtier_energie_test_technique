import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRoutes({ expectedRoles, children }) {
  const navigate = useNavigate();

  const [role, setRole] = useState(undefined);

  useEffect(() => {
    const fetchUserInformation = async () => {
      if ("token" in localStorage) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios({
            method: "POST",
            url: `${import.meta.env.VITE_BACKEND_URL}/api/verify-token`,
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.status === 200) {
            const userInfo = response.data;
            setRole(userInfo.role);
          } else {
            console.error("User information not found");
          }
        } catch (error) {
          console.error("Can not get user data", error);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };
    fetchUserInformation();
  }, []);

  if (role !== undefined) {
    if (!expectedRoles.includes(role)) {
      navigate("/no-access");
    }
  }
  return expectedRoles.includes(role) ? children : null;
}

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
  expectedRoles: PropTypes.node.isRequired,
};

export default PrivateRoutes;
