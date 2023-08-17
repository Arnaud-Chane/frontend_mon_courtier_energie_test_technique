import { Link } from "react-router-dom";
import LogoMCE from "../assets/images/logo-mce.png";

function Navbar() {
  return (
    <div className="Navbar">
      <Link to="/">
        <img src={LogoMCE} alt="Logo MCE" />
      </Link>
    </div>
  );
}

export default Navbar;
