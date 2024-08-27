import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/redux";
import Auth from "./pages/Auth";
import Repositories from "./pages/Repositories";
import { publicRoutes, signedRoutes } from "./routes/routes";
import HeaderComponent from "./components/Header";

const Routing = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <HeaderComponent />
      <Routes>
        {isAuth &&
          signedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
        <Route path="*" element={isAuth ? <Repositories /> : <Auth />} />
      </Routes>
    </Router>
  );
};

export default Routing;
