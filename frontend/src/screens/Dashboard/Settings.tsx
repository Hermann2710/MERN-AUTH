import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Breadcrumb from "../../components/Breadcrumb";
import { Link } from "react-router-dom";
import EditPassword from "./EditPassword";
import EditProfile from "./EditProfile";

function Settings() {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? (
        <div className="w-screen flex justify-center">
          <div className="flex flex-col w-full p-3 md:w-10/12 lg:w-8/12">
            <Breadcrumb location="Settings" />
            <EditPassword id="password" />
            <EditProfile id="profile" />
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-center mt-80 font-bold text-2xl">
            You are not authenticated <br />
            <Link className="text-red-500" to="/account/login">
              Login now
            </Link>
          </h1>
        </>
      );
}

export default Settings;