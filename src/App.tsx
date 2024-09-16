import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import RememberPassword from "./pages/RememberPassword/RememberPassword";
import Logout from "./pages/Logout/Logout";
import Personal from "./pages/Personal/Personal";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/rememberpassword" element={<RememberPassword />} />
      <Route path="/personal" element={<Personal />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Navigate to={"/signin"} />} />
    </Routes>
  );
}

export default App;
