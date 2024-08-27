import { FC, useState } from "react";
import { Tabs, Card, Typography } from "antd";
import LogInComponent from "../components/LogIn";
import RegisterComponent from "../components/Register";

const { TabPane } = Tabs;
const { Title } = Typography;

const Auth: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("login");

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          maxWidth: 400,
          width: "100%",
          padding: "20px",
          borderRadius: 8,
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: 20 }}>
          {activeTab === "login" ? "Login" : "Register"}
        </Title>
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="Login" key="login">
            <LogInComponent />
          </TabPane>
          <TabPane tab="Register" key="register">
            <RegisterComponent />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
