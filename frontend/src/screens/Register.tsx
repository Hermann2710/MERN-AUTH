import { Link } from "react-router-dom";
import { BsAt, BsEye } from "react-icons/bs";
import FormControl from "../components/FormControl";
import { useContext, useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { UseRegister } from "../hooks/UserController";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import FormButton from "../components/FormButton";
import ThemeSwitcher from "../components/ThemeSwitcher";

function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { register, error, loading } = UseRegister();
  const { dispatch } = useContext(AuthContext);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const json = await register(data);
    if (error) {
      const notify = toast(error);
      notify;
    } else if (json) {
      dispatch && dispatch({ type: "LOGIN", payload: json });
    }
  };

  return (
    <div className="justify-center items-center flex h-full w-full font-normal">
      <div className="w-[400px] select-none p-2">
        <h1 className="text-2xl font-black w-full h-full flex justify-between items-center">
          <Link to="/">
            <span className="text-red-600">Clay's</span>&nbsp;Store
          </Link>
          <ThemeSwitcher />
        </h1>
        <h3 className="mt-16">Fill the form below to register</h3>
        <form className="mt-5 flex flex-col gap-5" onSubmit={handleSubmit}>
          <FormControl
            Icon={BsAt}
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={data.username}
            handleChange={onInputChange}
            required
          />
          <FormControl
            Icon={TfiEmail}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={data.email}
            handleChange={onInputChange}
            required
          />
          <FormControl
            Icon={BsEye}
            type="password"
            name="password"
            id="password"
            placeholder="********"
            value={data.password}
            handleChange={onInputChange}
            required
          />
          <FormButton loading={loading} type="submit" text="Sign Up" />
        </form>
        <p className="text-center font-medium mt-5">
          Already have an account?{" "}
          <Link
            className="text-red-300 transition-all ease-in-out duration-500 hover:text-red-600"
            to="/login"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
