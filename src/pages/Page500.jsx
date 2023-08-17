import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import Image500 from "../assets/images/500.png";

function Page500() {
  const navigate = useNavigate();

  return (
    <div className="Page500">
      <img src={Image500} alt="500 error icon" />
      <div className="content">
        Merci de contacter le support, il y a dû y avoir un problème de notre
        part.
      </div>
      <Button type="primary" onClick={() => navigate("/")}>
        Revenir à la page d'accueil
      </Button>
    </div>
  );
}

export default Page500;
