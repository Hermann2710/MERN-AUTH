import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import FormControl from "../components/FormControl";
import { useContext, useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { UseLogin } from "../hooks/UserController";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import ThemeSwitcher from "../components/ThemeSwitcher";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { dispatch } = useContext(AuthContext);

  const { login, loading, error } = UseLogin();

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const json = await login(data);
    if(error) {    
        const notify = toast(error);
        notify;
    }else if(json) {
        dispatch && dispatch({ type: "LOGIN", payload: json });
    }
  };

  return (
    <div className="justify-center items-center flex h-full w-full font-normal">
      <div className="w-[400px] select-none p-2">
        <h1 className="text-2xl font-black w-full h-full flex justify-between items-center">
          <Link to="/">
            <span className="text-red-600">Auth</span>-System
          </Link>
          <ThemeSwitcher />
        </h1>
        <h3 className="mt-16">Fill the form below to Login</h3>
        <form className="mt-5 flex flex-col gap-5" onSubmit={handleSubmit}>
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
          <Link className="text-end font-medium text-red-400 hover:underline transition-all ease-in-out duration-500" to="#">Forgot password?</Link>
          <button disabled={loading} className="w-full bg-red-500 text-white py-3 font-bold hover:bg-red-600 transition-all duration-500 ease-in-out mt-5 rounded-lg">
            Sign Up
          </button>
        </form>
        <p className="text-center font-medium mt-5">
          Don't have an account?{" "}
          <Link
            className="text-red-300 transition-all ease-in-out duration-500 hover:text-red-600"
            to="/register"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;