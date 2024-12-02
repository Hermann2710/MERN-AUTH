import { SyntheticEvent, useContext, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { ThemeContext } from "../../contexts/ThemeContext";
import FormButton from "../../components/FormButton";
import { toast } from "react-toastify";
import { useUpdateProfileImage } from "../../hooks/UserController";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

function EditProfileImage() {
  const [file, setFile] = useState<string | null>(null);
  const [image, setImage] = useState<File>();
  const { theme } = useContext(ThemeContext);
  const { error, loading, updateProfileImage } = useUpdateProfileImage();
  const { dispatch, user } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setFile(imageUrl);
      setImage(e.target.files[0]);
    }
  };

  const handleEdit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!image) {
      return toast.error("The image is required", {
        position: "bottom-right",
      });
    } else {
      const json = await updateProfileImage(image);
      if (error) {
        return toast.error(error, {
          position: "bottom-right",
        });
      } else {
        dispatch && dispatch({ type: "UPDATE", payload: json });
        return toast.success("Profile image updated successfully", {
          position: "bottom-right",
        });
      }
    }
  };

  return user ? (
    <div className="w-screen flex justify-center">
      <div className="flex flex-col w-full p-3 md:w-10/12 lg:w-8/12">
        <Breadcrumb location="Edit profile Image" />
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleEdit}
        >
          <h2 className="text-2xl font-bold mb-4 mt-4">
            Change profile image :
          </h2>
          <input
            type="file"
            onChange={handleChange}
            accept="image/*"
            className={`w-full text-gray-500 font-medium ${
              theme === "dark" && "bg-slate-600 text-white"
            } text-sm file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded`}
          />

          {file ? (
            <div className="mb-4">
              <img
                width={600}
                height={600}
                src={file}
                className="mt-8 rounded-lg"
                alt={file}
              />
            </div>
          ) : (
            <div className="mb-4">
              <img
                width={600}
                height={600}
                src={"http://localhost:3500/" + user?.profileImage}
                className="mt-8 rounded-lg"
                alt={user?.username}
              />
            </div>
          )}
          <FormButton loading={loading} type="submit" text="Change image" />
        </form>
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

export default EditProfileImage;
