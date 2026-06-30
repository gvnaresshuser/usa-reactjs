import React from "react";

const UserCardProps = (props) => {
  // ===================================================
  // Method 1: Using the props object
  // ===================================================
  const extendedUser1 = {
    ...props.user,
    status: props.ageStatus,
  };

  // ===================================================
  // Method 2: Destructuring props
  // ===================================================
  const { user, ageStatus } = props;

  const extendedUser2 = {
    ...user,
    status: ageStatus,
  };

  // ===================================================
  // Method 3: Nested Object Destructuring
  // ===================================================
  const {
    user: { name, age },
  } = props;

  return (
    <>
      {/* ============================================== */}
      <h2>Method 1 - Using Props Object</h2>
      {/* ============================================== */}
      <div
        style={{
          border: "1px solid red",
          padding: "10px",
          margin: "10px",
        }}
      >
        <h3>{extendedUser1.name}</h3>
        <p>Age : {extendedUser1.age}</p>
        <p>Status : {extendedUser1.status}</p>
      </div>

      {/* ============================================== */}
      <h2>Method 2 - Destructuring Props</h2>
      {/* ============================================== */}
      <div
        style={{
          border: "1px solid blue",
          padding: "10px",
          margin: "10px",
        }}
      >
        <h3>{extendedUser2.name}</h3>
        <p>Age : {extendedUser2.age}</p>
        <p>Status : {extendedUser2.status}</p>
      </div>

      {/* ============================================== */}
      <h2>Method 3 - Nested Object Destructuring</h2>
      {/* ============================================== */}
      <div
        style={{
          border: "1px solid green",
          padding: "10px",
          margin: "10px",
        }}
      >
        <h3>{name}</h3>
        <p>Age : {age}</p>
        <p>Status : {props.ageStatus}</p>
      </div>
    </>
  );
};

export default UserCardProps;
