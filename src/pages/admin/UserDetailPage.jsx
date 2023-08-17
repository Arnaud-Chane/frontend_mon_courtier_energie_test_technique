import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { UserInfoContext } from "../../context/UserRoleContext";

function UserDetailPage() {
  const navigate = useNavigate();

  const { userInfo } = useContext(UserInfoContext);

  return (
    <div className="UserDetailPage">
      <div className="user-pseudo">{userInfo.pseudo}</div>
      <Button type="primary" onClick={() => navigate("/admin")}>
        Annuler
      </Button>
    </div>
  );
}

export default UserDetailPage;
