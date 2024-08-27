import Auth from "../pages/Auth";
import Repositories from "../pages/Repositories";

export const signedRoutes = [{ path: "repositories", component: Repositories }];

export const publicRoutes = [
  {
    path: "auth",
    component: Auth,
  },
];
