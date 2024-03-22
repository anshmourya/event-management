import { Route, Routes } from "react-router-dom";
import Home from "@pages/Home";
import Signin from "@pages/Signin";
import Signup from "@pages/Signup";
import { Toaster } from "react-hot-toast";
import CreateEvent from "./pages/CreateEvent";
import Layout from "./components/layout";
import Bookings from "./pages/Bookings";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/mybookings" element={<Bookings />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
