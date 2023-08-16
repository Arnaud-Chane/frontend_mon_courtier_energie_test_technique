import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Page404() {
  const navigate = useNavigate();

  return (
    <div className="Page404">
      <Button type="primary" onClick={() => navigate("/")}>
        Revenir à la page d'accueil
      </Button>
    </div>
  );
}

export default Page404;
