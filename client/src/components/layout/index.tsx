import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
const Layout = () => {
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
