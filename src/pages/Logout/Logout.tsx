import { useUserStore } from "../../api/UserAPI";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
  const navigate = useNavigate();
  const { isLogedIn, logout } = useUserStore();

  useEffect(() => {
    logout();

    if (!isLogedIn()) {
      navigate("/sigin");
    }
  }, [isLogedIn, logout, navigate]);

  return null;
}
