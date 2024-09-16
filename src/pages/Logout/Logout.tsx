import * as React from "react";
import { User } from "../../api/User";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  //   TODO: Сделать через конструктор и new
  const user = User;
  const navigate = useNavigate();

  user.logout();
  navigate("/sigin");

  return <></>;
}
