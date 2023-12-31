import { Button, Form, Input } from "antd";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import LogoMCE from "../assets/images/logo-mce.png";

function LoginPage() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        values
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
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
    <div className="LoginPage">
      <img className="logo-page" src={LogoMCE} alt="LogoMCE icon" />

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
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Veuillez renseigner une adresse mail.",
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
          <div className="btn-ctn">
            <Button className="btn-login" type="primary" htmlType="submit">
              Connexion
            </Button>
          </div>
        </Form.Item>
      </Form>
      <Link to="/sign-up">
        <div className="btn-to-signup">S'enregistrer</div>
      </Link>
    </div>
  );
}

export default LoginPage;
