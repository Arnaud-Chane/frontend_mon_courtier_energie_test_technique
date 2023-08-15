import { Form, Input } from "antd";

function SignUpPage() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
      </Form>
    </div>
  );
}

export default SignUpPage;
