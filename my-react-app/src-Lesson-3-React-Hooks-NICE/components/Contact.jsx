//rafce
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Contact = () => {
  //STEP 3 - CONSUMING THE CONTEXT DATA
  /* const phone = useContext(AppContext); */
  const { phone, name } = useContext(AppContext);
  return (
    <>
      <div>Contact</div>
      <h3>Phone:{phone}</h3>
      <h3>Name:{name}</h3>
    </>
  );
};

export default Contact;
