import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import { setTokenToLocalStorage } from "../helpers/localStorage.helper";
import { login } from "../store/auth/authSlice";
import { useAppDispatch } from "../store/hooks";

const LogInComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const data = await AuthService.login(values);
      const token = data.accessToken.replace(/(^"|"$)/g, "");

      if (data) {
        setTokenToLocalStorage("token", token);
        dispatch(login(data));
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
      style={{ width: "100%" }}
      name="login"
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
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LogInComponent;
