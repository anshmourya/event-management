import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
const useAuth = () => {
  const cookies = new Cookies();
  const [isloggedIn, setIsloggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const token = cookies.get("authToken");
    if (token) {
      setIsloggedIn(true);
    }
    setLoading(false);
  }, []);
  return { isloggedIn, setIsloggedIn, loading, setLoading };
};

export default useAuth;
