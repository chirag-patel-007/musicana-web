import { useEffect } from "react";
import { useNavigate } from "react-router";

const AuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      localStorage.clear();
      navigate("/login"); // Redirect when logout event occurs
    };

    window.addEventListener("logout", handleLogout);

    return () => {
      window.removeEventListener("logout", handleLogout);
    };
  }, []);

  return null;
};
export default AuthHandler;
