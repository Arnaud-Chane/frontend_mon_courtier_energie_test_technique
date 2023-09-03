import { useContext } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import { UserInfoContext } from "../context/UserRoleContext";

function ProfilePage() {
  const navigate = useNavigate();

  const { userInfo } = useContext(UserInfoContext);

  return (
    <div className="ProfilePage">
      <div className="page-content">
        <div className="profile-title-ctn">
          <div className="title">Votre Profil</div>
          <div className="h_line_title" />
        </div>
        <div className="profile-pseudo-ctn">
          <div className="pseudo">{userInfo.pseudo}</div>
          <div className="h_line_profile" />
        </div>
        <div className="profile-email-ctn">
          <div className="email">{userInfo.email}</div>
          <div className="h_line_profile" />
        </div>
        <Button
          className="btn-profile-to-home"
          type="primary"
          onClick={() => navigate("/")}
        >
          Revenir à la page d'accueil
        </Button>
      </div>
    </div>
  );
}

export default ProfilePage;
