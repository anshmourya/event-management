import { Route, Routes } from "react-router-dom";
import Home from "@pages/Home";
import Signin from "@pages/Signin";
import Signup from "@pages/Signup";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
