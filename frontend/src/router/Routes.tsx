import { RouteObject } from "react-router-dom";
import Login from "../screens/Login";
import Notfound from "../screens/Notfound";
import Register from "../screens/Register";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../screens/Dashboard";
import Settings from "../screens/Dashboard/Settings";
import EditProfileImage from "../screens/Dashboard/EditProfileImage";

const Routes: RouteObject[] = [
  {
    path: "",
    Component: DashboardLayout,
    errorElement: <Notfound />,
    children: [
      { path: "", Component: Dashboard },
      { path: "/settings", Component: Settings },
      { path: "/profile-image", Component: EditProfileImage },
    ]
  },
  {
    path: "/account",
    Component: AuthLayout,
    errorElement: <Notfound />,
    children: [
      { path: "/account/login", Component: Login },
      { path: "/account/register", Component: Register },
    ],
  },
];

export default Routes;
