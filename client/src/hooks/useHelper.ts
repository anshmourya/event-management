import { cookie } from "@/global/global.type";
import Cookies from "universal-cookie";

const useHelper = () => {
  const cookies = new Cookies();
  const createCookie = (cookie: cookie) => {
    cookies.set(cookie.name, cookie.data, {
      sameSite: "strict",
      path: "/",
      expires: new Date(
        new Date().getTime() + cookie.duration * 60 * 60 * 1000
      ), // 3 hours from the current date
      secure: true,
      //httpOnly: true,
    });
  };
  return { createCookie };
};

export default useHelper;
