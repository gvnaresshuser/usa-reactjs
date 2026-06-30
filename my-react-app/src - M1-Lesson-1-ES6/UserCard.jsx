import React from 'react';

// Destructuring props (ES6)
const UserCard = ({ user, ageStatus }) => {
    // Spread operator (ES6)
    const extendedUser = { ...user, status: ageStatus };
    console.log(extendedUser);

    return (
        <div style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
            <h3>{extendedUser.name}</h3>
            <p>Age: {extendedUser.age}</p>
            <p>Status: {extendedUser.status}</p>
        </div>
    );
};

export default UserCard;
