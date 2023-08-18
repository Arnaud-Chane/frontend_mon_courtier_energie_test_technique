import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import Image403 from "../assets/images/403.png";

function Page403() {
  const navigate = useNavigate();

  return (
    <div className="Page403">
      <img src={Image403} alt="403 error icon" />
      <div className="content">
        Vous n’êtes pas autorisé.e à voir le contenu de cette page
      </div>
      <Button type="primary" onClick={() => navigate("/")}>
        Revenir à la page d'accueil
      </Button>
    </div>
  );
}

export default Page403;
