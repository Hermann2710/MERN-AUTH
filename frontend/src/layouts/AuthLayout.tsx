import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeContext } from "../contexts/ThemeContext";

function AuthLayout() {
    const { theme } = useContext(ThemeContext);
    return (
        <>
            <ToastContainer position="bottom-right" theme={theme} />
            <Outlet />
        </>
    );
}

export default AuthLayout;