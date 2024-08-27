import React, { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { AuthService } from "./services/auth.service";
import { login, logout } from "./store/auth/authSlice";
import { getTokenFromLocalStorage } from "./helpers/localStorage.helper";
import Routing from "./Routing";
import "./App.css";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();

    try {
      if (token) {
        const data = await AuthService.getMe();

        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw new Error(e?.response?.data.message);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <Routing />;
};

export default App;
