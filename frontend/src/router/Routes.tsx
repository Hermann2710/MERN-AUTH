import { RouteObject } from "react-router-dom";
import Login from "../screens/Login";
import Notfound from "../screens/Notfound";
import Register from "../screens/Register";
import AuthLayout from "../layouts/AuthLayout";

const Routes: RouteObject[] = [
  {
    path: "",
    Component: AuthLayout,
    errorElement: <Notfound />,
    children: [
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
    ],
  },
];

export default Routes;
