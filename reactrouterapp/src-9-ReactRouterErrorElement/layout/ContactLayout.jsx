import React from "react";
import Contact from "../pages/Contact";
import { Outlet } from "react-router-dom";

const ContactLayout = () => {
  return (
    <div className="contact-layout">
      <Contact />
      <Outlet />
    </div>
  );
};

export default ContactLayout;
