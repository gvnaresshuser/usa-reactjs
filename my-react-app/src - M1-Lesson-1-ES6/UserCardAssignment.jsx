//UserCardAssignment.jsx

import React from "react";
import "./UserCardAssignment.css";

const UserCardAssignment = ({ user, ageStatus }) => {
  //{ name: 'Alice', age: 17 },

  const extendedUser = { ...user, status: ageStatus };
  //{ name: 'Alice', age: 17, status:'ADULT' },

  const experience =
    extendedUser.age < 22
      ? "Beginner"
      : extendedUser.age < 30
        ? "Intermediate"
        : "Expert";

  const profession =
    extendedUser.age < 22
      ? "Student"
      : extendedUser.age < 30
        ? "Developer"
        : "Senior Engineer";

  return (
    <div className="user-card">
      <div className="user-card-header">
        <h3 className="user-name">{extendedUser.name}</h3>
        <span
          className={`status-badge ${extendedUser.status === "Adult" ? "adult" : "minor"}`}
        >
          {extendedUser.status}
        </span>
      </div>
      <div className="user-details">
        <p>
          <strong>Age:</strong> {extendedUser.age}
        </p>
        <p>
          <strong>Experience:</strong> {experience}
        </p>
        <p>
          <strong>Profession:</strong> {profession}
        </p>
      </div>
    </div>
  );
};

export default UserCardAssignment;
