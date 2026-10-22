// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function Dashboard() {
    const [token, setToken] = useState('');
    const [decoded, setDecoded] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken || '');

        if (storedToken) {
            try {
                const decodedToken = jwtDecode(storedToken);
                setDecoded(decodedToken);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-4xl font-bold text-green-600 mb-6 text-center">Welcome to the Dashboard</h1>

            {decoded && (
                <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 mt-6">
                    <h3 className="text-lg font-semibold mb-2 text-green-600">JWT Token</h3>
                    <div className="text-sm break-all mb-4 bg-gray-100 p-2 rounded">{token}</div>

                    <h3 className="text-lg font-semibold mb-2 text-blue-600">Decoded Token Details</h3>
                    <table className="w-full text-sm table-auto border border-collapse border-gray-300">
                        <tbody>
                            {Object.entries(decoded).map(([key, value]) => (
                                <tr key={key} className="border-b border-gray-200">
                                    <td className="font-medium p-2 capitalize">{key}</td>
                                    <td className="p-2">
                                        {typeof value === 'number' && (key === 'iat' || key === 'exp')
                                            ? new Date(value * 1000).toLocaleString()
                                            : JSON.stringify(value)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-6 p-4 bg-blue-50 rounded-xl shadow-inner">
                        <h4 className="text-md font-semibold text-blue-800 mb-2">User Role</h4>
                        <p className="text-sm bg-white p-2 rounded border">{decoded.role || 'N/A'}</p>

                        <h4 className="text-md font-semibold text-blue-800 mt-4 mb-2">Permissions</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            {(Array.isArray(decoded.permissions) ? decoded.permissions : []).map((perm, i) => (
                                <li key={i} className="bg-white p-1 rounded border">{perm}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
