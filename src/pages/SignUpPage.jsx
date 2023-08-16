import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        values
      );
      if (response.status === 201) {
        console.info(
          "Données enregistrées avec succès dans la base de données !"
        );
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      console.info("Veuillez vérifier vos informations.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.info("Failed:", errorInfo);
  };

  return (
    <div className="SignUpPage">
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Pseudo"
          name="pseudo"
          rules={[
            {
              required: true,
              message: "Veuillez renseigner votre identifiant.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Veuillez renseigner votre adresse mail.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Veuillez renseigner votre mot de passe.",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Créer le compte
          </Button>
        </Form.Item>
      </Form>
      <Link to="/login">
        <div className="btn-to-signup">Se connecter</div>
      </Link>
    </div>
  );
}

export default SignUpPage;
