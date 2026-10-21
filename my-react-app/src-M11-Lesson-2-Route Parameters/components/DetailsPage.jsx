// src/components/DetailsPage.jsx
import React from "react";
import { useLocation } from "react-router-dom";

function DetailsPage() {
  const location = useLocation();
  const { id, name } = location.state || {};
  return (
    <h2>
      Details: {name} (ID: {id})
    </h2>
  );
}

export default DetailsPage;
//state={{ id: 101, name: 'React' }}
//You can name the data properties anything you like,..id,name etc
// but the navigation prop must be state.
