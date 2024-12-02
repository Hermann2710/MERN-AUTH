import { SyntheticEvent, useContext, useState } from "react";
import FormControl from "../../components/FormControl";
import { BsEye } from "react-icons/bs";
import FormButton from "../../components/FormButton";
import { toast } from "react-toastify";
import { useUpdatePassword } from "../../hooks/UserController";
import { AuthContext } from "../../contexts/AuthContext";

function EditPassword({id}: {id: string}) {
  const [data, setData] = useState({
    password: "",
    coPassword: "",
  });
  const { error, loading, updatePassword } = useUpdatePassword();
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
    if(data.password.length < 8) {
      return toast.error("Invalid password");
    }else if(data.password !== data.coPassword) {
      return toast.error("The password are differents")
    }else {
      const json = await updatePassword(data);
      if(error) {
        return toast.error(error);
      }else if(json){
        dispatch && dispatch({ type: "UPDATE", payload: json });
        return toast.success("Password updated successfully");
      }
    }
  }

  return (
    <section id={id}>
      <h1 className="mt-5 font-bold text-xl mb-10 sm:mb-10">Edit password</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormControl
          handleChange={onInputChange}
          value={data.password}
          placeholder="New password"
          name="password"
          id="password"
          type="password"
          Icon={BsEye}
        />
        <FormControl
          handleChange={onInputChange}
          value={data.coPassword}
          placeholder="Confirm password"
          name="coPassword"
          id="coPassword"
          type="password"
          Icon={BsEye}
        />
        <FormButton loading={loading} text="Change password" type="submit" />
      </form>
    </section>
  );
}

export default EditPassword;
