import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setRole(decoded.role);
                setIsAuthenticated(true);
            } catch (e) {
                console.error('Invalid token', e);
                setRole('');
                setIsAuthenticated(false);
            }
        } else {
            setRole('');
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setRole('');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">PERN Authentication / Authorization</h1>
            <div className="space-x-4">
                {!isAuthenticated ? (
                    <>
                        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                        <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                    </>
                ) : (
                    <>
                        {/* Show only if NOT admin */}
                        {role !== 'admin' && (
                            <>
                                <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
                                <Link to="/products" className="text-blue-600 hover:underline">Products</Link>
                            </>
                        )}

                        {/* Show only if admin */}
                        {role === 'admin' && (
                            <Link to="/admin" className="text-blue-600 hover:underline">Admin Panel</Link>
                        )}

                        <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}
