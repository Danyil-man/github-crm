import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/auth/authSlice";
import { removeTokenFromLocalStorage } from "../helpers/localStorage.helper";
import { Button, Menu } from "antd";

const HeaderComponent: FC = () => {
  const { isAuth } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    removeTokenFromLocalStorage("token");
    navigate("/auth");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h4>GitHub CRM</h4>
      <Menu
        theme="light"
        mode="horizontal"
        selectable={false}
        style={{ marginLeft: "auto" }}
      >
        {isAuth && (
          <Menu.Item key="1">
            <Button
              style={{ width: "100%" }}
              type="primary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
};

export default HeaderComponent;
