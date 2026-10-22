// src/pages/Profile.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

// ================== NOT USING THIS PAGE =======================

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data);
            } catch (err) {
                alert('Unauthorized');
            }
        };
        fetchProfile();
    }, []);

    if (!user) return <p className="text-center">Loading profile...</p>;

    return (
        <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold">Welcome, {user.name}</h2>
            <p className="text-gray-600">Email: {user.email}</p>
        </div>
    );
}
