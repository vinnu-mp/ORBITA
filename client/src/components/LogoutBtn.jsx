import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../store/auth/authSlice";
import { logoutUser } from "../api/auth.api";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();

      dispatch(logout());

      navigate("/login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg bg-red-500 text-white"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
