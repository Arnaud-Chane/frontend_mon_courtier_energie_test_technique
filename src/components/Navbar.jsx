import { Link, useNavigate } from "react-router-dom";
import LogoMCE from "../assets/images/logo-mce.png";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="Navbar">
      <Link to="/">
        <img src={LogoMCE} alt="Logo MCE" />
      </Link>
      <button type="submit" className="logout" onClick={handleLogout}>
        Déconnexion
      </button>
    </div>
  );
}

export default Navbar;
