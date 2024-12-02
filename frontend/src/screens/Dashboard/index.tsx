import { useContext } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { AuthContext } from "../../contexts/AuthContext";
import reactSvg from "../../assets/react.svg";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user, dispatch, isAuthenticated } = useContext(AuthContext);
  console.log(user, isAuthenticated);
  return isAuthenticated ? (
    <div className="w-screen flex justify-center">
      <div className="flex flex-col w-full p-3 md:w-10/12 lg:w-8/12">
        <Breadcrumb location="Home" />
        <h1 className="mt-5 font-bold text-xl mb-20 sm:mb-10">
          Profile Details
        </h1>
        <div className="flex flex-col justify-center gap-10 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-5">
            <h3>
              <span className="font-bold">Username</span>: {user?.username}
            </h3>
            <h3>
              <span className="font-bold">Email</span>: {user?.email}
            </h3>
            <h3>
              <span className="font-bold">Created At</span>:{" "}
              {new Date(user?.createdAt || 0).toUTCString()}
            </h3>
            <h3>
              <span className="font-bold">Updated At</span>:{" "}
              {new Date(user?.updatedAt || 0).toUTCString()}
            </h3>
            <Link className="hover:text-red-500 hover:underline transition-all ease-in-out duration-500 w-fit" to="/settings#password">Edit password</Link>
            <Link className="hover:text-red-500 hover:underline transition-all ease-in-out duration-500 w-fit" to="/settings#profile-image">Edit profile image</Link>
            <Link className="hover:text-red-500 hover:underline transition-all ease-in-out duration-500 w-fit" to="/settings#profile">Edit profile</Link>
          </div>
          <div className="flex justify-center items-center">
            <img
              className="hidden sm:block"
              height={300}
              width={300}
              src={user?.profileImage ? user.profileImage : reactSvg}
            />
            <img
              className="sm:hidden block"
              height={200}
              width={200}
              src={user?.profileImage ? user.profileImage : reactSvg}
            />
          </div>
        </div>
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

export default Dashboard;
