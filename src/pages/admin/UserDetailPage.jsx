import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { Button, Form, Input } from "antd";

function UserDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userPseudo, setUserPseudo] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`)
      .then((response) => {
        const infoUser = response.data;
        setUserPseudo(infoUser.pseudo);
        setUserEmail(infoUser.email);
      });
  }, [id]);

  const onSubmit = async (values) => {
    const body = {
      pseudo: values.pseudo,
      email: values.email,
      user_id: id,
      is_admin: 0,
    };
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`,
        body
      );
      if (response.status === 204) {
        navigate("/admin");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.info("Failed:", errorInfo);
  };

  return (
    <div className="UserDetailPage">
      <div className="user-pseudo">{userPseudo}</div>

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
          <Input placeholder={userPseudo} />
        </Form.Item>

        <Form.Item label="" name="email">
          <Input placeholder={userEmail} />
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
