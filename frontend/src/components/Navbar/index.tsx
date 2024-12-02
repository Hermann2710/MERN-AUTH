import { BiLogOut, BiMenu, BiX } from "react-icons/bi";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
  const { dispatch } = useContext(AuthContext);
  const pathName = useLocation();

  const handleLogout = () => {
    dispatch && dispatch({ type: "LOGOUT" });
  };

  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="sm:flex flew-col justify-center">
      <nav className="flex justify-between items-center w-full p-3 md:w-10/12 lg:w-8/12">
        <Link className="font-bold text-2xl select-none" to={"/"}>
          <span className="text-red-500">A</span>S
        </Link>
        <button
          className="block sm:hidden text-4xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <BiX /> : <BiMenu />}
        </button>
        <div className="sm:flex hidden flex-row gap-10 items-center">
          <div className="flex flex-row gap-10 font-semibold text-lg">
            <NavLink
              className={`${
                pathName.pathname === "/" && "text-red-500 font-bold"
              }`}
              to=""
            >
              Dashboard
            </NavLink>
            <NavLink
              className={`${
                pathName.pathname === "/settings" && "text-red-500 font-bold"
              }`}
              to="/settings"
            >
              Settings
            </NavLink>
          </div>
          <div className="flex flex-row gap-3 text-xl">
            <BiLogOut
              className="text-red-500 cursor-pointer"
              onClick={handleLogout}
              size={30}
            />
            <ThemeSwitcher size={30} />
          </div>
        </div>
      </nav>
      {open && (
        <div className="flex fixed w-screen h-screen backdrop-blur-lg sm:hidden flex-col gap-10 justify-center items-center z-10">
          <div className="flex flex-col text-center gap-10 font-semibold text-lg">
            <NavLink
              className={`${
                pathName.pathname === "/" && "text-red-500 font-bold"
              }`}
              to=""
            >
              Dashboard
            </NavLink>
            <NavLink
              className={`${
                pathName.pathname === "/settings" && "text-red-500 font-bold"
              }`}
              to="/settings"
            >
              Settings
            </NavLink>
          </div>
          <div className="flex flex-row gap-3 text-xl">
            <BiLogOut
              className="text-red-500 cursor-pointer"
              onClick={handleLogout}
              size={30}
            />
            <ThemeSwitcher size={30} />
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
