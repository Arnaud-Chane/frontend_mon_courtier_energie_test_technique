import { useContext } from "react";
import { Link } from "react-router-dom";
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
        <img src={LogoMCE} alt="Logo MCE" />
      </Link>
      {userInfo.role === 1 ? (
        <Link to="/admin">Liste des membres</Link>
      ) : (
        <Link to="/profile">Profil</Link>
      )}
      <a href="/">
        <button type="submit" className="logout" onClick={handleLogout}>
          Déconnexion
        </button>
      </a>
    </div>
  );
}

export default Navbar;
