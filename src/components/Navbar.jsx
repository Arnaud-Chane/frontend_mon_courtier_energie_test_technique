import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoMCE from "../assets/images/logo-mce.png";
import { UserInfoContext } from "../context/UserRoleContext";

function Navbar() {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserInfoContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="Navbar">
      <Link to="/">
        <img src={LogoMCE} alt="Logo MCE" />
      </Link>
      {userInfo.role === 1 ? (
        <Link to="/admin">Liste des membres</Link>
      ) : (
        <Link to="/profile">Profil</Link>
      )}
      <button type="submit" className="logout" onClick={handleLogout}>
        Déconnexion
      </button>
    </div>
  );
}

export default Navbar;
