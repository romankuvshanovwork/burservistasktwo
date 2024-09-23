import * as React from "react";
import { User } from "../../api/User";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
  const user = User;
  const navigate = useNavigate();

  user.logout();
  
  useEffect(() => {
    if (!user.isLogedIn()) {
      navigate("/sigin");
    }
  }, [navigate, user]);

  return <></>;
}
