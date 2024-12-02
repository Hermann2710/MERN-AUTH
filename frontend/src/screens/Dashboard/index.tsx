import { SyntheticEvent, useContext } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { AuthContext } from "../../contexts/AuthContext";
import reactSvg from "../../assets/react.svg";
import { Link } from "react-router-dom";
import FormButton from "../../components/FormButton";
import { useDeleteProfile } from "../../hooks/UserController";
import { toast } from "react-toastify";

function Dashboard() {
  const { user, dispatch, isAuthenticated } = useContext(AuthContext);
  const { loading, error, deleteProfile } = useDeleteProfile();

  const handleDeleteProfile = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete your profile?")) {
      const json = await deleteProfile();
      if (error) {
        return toast(error);
      } else if (json) {
        dispatch && dispatch({ type: "LOGOUT" });
        localStorage.removeItem("token");
        toast.success("Profile deleted successfully");
      }
    }
  };

  return isAuthenticated ? (
    <div className="w-screen flex justify-center">
      <div className="flex flex-col w-full p-3 md:w-10/12 lg:w-8/12">
        <Breadcrumb location="Home" />
        <h1 className="mt-5 font-bold text-xl mb-10 sm:mb-10">
          Profile Details
        </h1>
        <div className="flex flex-col justify-center gap-10 sm:flex-row sm:justify-between">
          <div className="flex justify-center items-center">
            <img
              className="hidden sm:block rounded-lg"
              height={700}
              width={500}
              src={
                user?.profileImage
                  ? "http://localhost:3500/" + user.profileImage
                  : reactSvg
              }
            />
            <img
              className="sm:hidden block rounded-lg"
              height={200}
              width={300}
              src={
                user?.profileImage
                  ? "http://localhost:3500/" + user.profileImage
                  : reactSvg
              }
            />
          </div>
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
            <form onSubmit={handleDeleteProfile}>
              <FormButton
                loading={loading}
                text="Delete account"
                type="submit"
              />
            </form>
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
