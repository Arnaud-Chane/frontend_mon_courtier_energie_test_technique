import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Page403() {
  const navigate = useNavigate();

  return (
    <div className="Page403">
      <Button type="primary" onClick={() => navigate("/")}>
        Revenir à la page d'accueil
      </Button>
    </div>
  );
}

export default Page403;
