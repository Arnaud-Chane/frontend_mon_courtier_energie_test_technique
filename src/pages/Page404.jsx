import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import Image404 from "../assets/images/404.png";

function Page404() {
  const navigate = useNavigate();

  return (
    <div className="Page404">
      <img src={Image404} alt="404 error icon" />
      <div className="content">Page non trouvée </div>
      <div className="btn-ctn">
        <Button
          className="btn-back-home"
          type="primary"
          onClick={() => navigate("/")}
        >
          Revenir à la page d'accueil
        </Button>
      </div>
    </div>
  );
}

export default Page404;
