import React from "react";
import { Outlet, Navigate } from "react-router-dom";

//----------------------------- USING OUTLET APPROACH -----------------------
const Privateroute = () => {
    let auth = false;
    if (localStorage.getItem("jwtToken") && localStorage.getItem("userid")) {
        auth = true;
    }
    return auth ? <Outlet /> : <Navigate to="/login" />;
};
//----------------------------- USING CHILDREN APPROACH -----------------------
/* const Privateroute = ({ children }) => {
  const auth =
    localStorage.getItem("jwtToken") && localStorage.getItem("userid");

  return auth ? children : <Navigate to="/login" />;
}; */
//---------------------------------------------------------------------------

const Privaterouteadmin = () => {
  let auth = false;
  if (localStorage.getItem("jwtToken") && localStorage.getItem("adminid")) {
    auth = true;
  }
  return auth ? <Outlet /> : <Navigate to="/admin-login" />;
};

export { Privateroute, Privaterouteadmin }; //named export
