import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { UserInfoContext } from "../../context/UserRoleContext";

function UserDetailPage() {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserInfoContext);

  const onSubmit = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="UserDetailPage">
      <div className="user-pseudo">{userInfo.pseudo}</div>

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="" name="pseudo">
          <Input defaultValue={userInfo.pseudo} />
        </Form.Item>

        <Form.Item label="" name="email">
          <Input defaultValue={userInfo.email} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Mettre à jour
          </Button>
        </Form.Item>
      </Form>
      <Button type="primary" onClick={() => navigate("/admin")}>
        Annuler
      </Button>
    </div>
  );
}

export default UserDetailPage;
