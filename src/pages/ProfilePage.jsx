import { useContext } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import { UserInfoContext } from "../context/UserRoleContext";

function ProfilePage() {
  const navigate = useNavigate();

  const { userInfo } = useContext(UserInfoContext);

  return (
    <div className="ProfilePage">
      <div className="pseudo">{userInfo.pseudo}</div>
      <div className="email">{userInfo.email}</div>
      <Button type="primary" onClick={() => navigate("/")}>
        Revenir à la page d'accueil
      </Button>
    </div>
  );
}

export default ProfilePage;
