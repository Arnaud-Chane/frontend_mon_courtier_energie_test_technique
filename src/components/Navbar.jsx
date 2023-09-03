import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

import LogoMCE from "../assets/images/logo-mce.png";
import { UserInfoContext } from "../context/UserRoleContext";

function Navbar() {
  const { userInfo } = useContext(UserInfoContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="Navbar">
      <Link to="/">
        <img className="logo-navbar" src={LogoMCE} alt="Logo MCE" />
      </Link>
      {userInfo.role === 1 ? (
        <Link to="/admin">
          <div className="navlink">Liste des membres</div>
        </Link>
      ) : (
        <Link to="/profile">
          <div className="navlink">Profil</div>
        </Link>
      )}
      <a href="/">
        <Button type="submit" onClick={() => handleLogout()} className="logout">
          Déconnexion
        </Button>
      </a>
    </div>
  );
}

export default Navbar;
