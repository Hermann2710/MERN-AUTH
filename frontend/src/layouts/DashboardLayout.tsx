import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeContext } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function DashboardLayout() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer position="top-right" theme={theme} />
    </>
  );
}

export default DashboardLayout;
