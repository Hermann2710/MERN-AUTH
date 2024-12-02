import { SyntheticEvent, useContext, useState } from "react";
import FormControl from "../../components/FormControl";
import { BsAt } from "react-icons/bs";
import FormButton from "../../components/FormButton";
import { TfiEmail } from "react-icons/tfi";
import { useUpdateProfile } from "../../hooks/UserController";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";

function EditProfile({ id }: { id: string }) {
  const [data, setData] = useState({
    username: "",
    email: "",
  });

  const { error, loading, updateProfile } = useUpdateProfile();
  const { dispatch } = useContext(AuthContext);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!data.email || !data.username) {
      return toast.error("All fields must be provides");
    } else if (!data.email.includes("@")) {
      return toast.error("Email must be valid");
    } else {
      const json = await updateProfile(data);
      if (error) {
        return toast.error(error);
      } else if (json) {
        dispatch && dispatch({ type: "UPDATE", payload: json });
        return toast.success("Profile updated");
      }
    }
  };

  return (
    <section id={id}>
      <h1 className="mt-5 font-bold text-xl mb-10 sm:mb-10">Edit profile</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormControl
          handleChange={onInputChange}
          value={data.username}
          placeholder="Username"
          name="username"
          id="username"
          type="text"
          Icon={BsAt}
        />
        <FormControl
          handleChange={onInputChange}
          value={data.email}
          placeholder="Email"
          name="email"
          id="email"
          type="email"
          Icon={TfiEmail}
        />
        <FormButton loading={loading} text="Edit profile" type="submit" />
      </form>
    </section>
  );
}

export default EditProfile;
