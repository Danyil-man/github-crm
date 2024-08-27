import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import { register } from "../store/auth/authSlice";
import { setTokenToLocalStorage } from "../helpers/localStorage.helper";
import { useAppDispatch } from "../store/hooks";

const RegisterComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const data = await AuthService.registration(values);
      const token = data.accessToken.replace(/(^"|"$)/g, "");

      if (data) {
        setTokenToLocalStorage("token", token);
        dispatch(register(data));
        navigate("/repositories");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      message.error(e?.response?.data.message);
    }
    setLoading(false);
  };

  return (
    <Form
      name="register"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please enter your email!" }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterComponent;
