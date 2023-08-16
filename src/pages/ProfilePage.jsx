import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="ProfilePage">
      <Button type="primary" onClick={() => navigate("/")}>
        Revenir à la page d'accueil
      </Button>
    </div>
  );
}

export default ProfilePage;
