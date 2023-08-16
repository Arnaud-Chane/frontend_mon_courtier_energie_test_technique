import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function UserDetailPage() {
  const navigate = useNavigate();

  return (
    <div className="UserDetailPage">
      <Button type="primary" onClick={() => navigate("/admin")}>
        Annuler
      </Button>
    </div>
  );
}

export default UserDetailPage;
