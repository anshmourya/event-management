import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../navbar";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import Spinner from "../loader/Spinner";
const Layout = () => {
  const { isloggedIn, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!isloggedIn) {
    toast.error("you must be logged in.");
    return <Navigate to="/signin" />;
  }

  return (
    <>
      <Navbar />
      <div className="container mt-10">
        {" "}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
