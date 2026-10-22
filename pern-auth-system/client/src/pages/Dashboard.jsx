import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';//npm install jwt-decode
import { Toast } from '../toast';

export default function Dashboard() {
    const [token, setToken] = useState('');
    const [decoded, setDecoded] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            window.location.href = '/login';
            return;
        }

        setToken(storedToken);
        try {
            const decodedToken = jwtDecode(storedToken);
            setDecoded(decodedToken);
        } catch (error) {
            console.error('Invalid token:', error);
        }

        // 🔹 Check token validity with backend
        axios.get('http://localhost:5000/api/auth/verify', {
            headers: { Authorization: `Bearer ${storedToken}` }
        })
            .catch(err => {
                if (err.response?.data?.error === 'TokenExpiredError') {
                    //alert('Session expired. Please log in again.');
                    localStorage.removeItem('token');
                    //--------------------- TOAST ----------------------------
                    // ✅ Show Toast on error

                   /*  Toast.fire({
                        icon: 'error',
                        title: '💥 Session Expired. Please log in again!',
                        background: '#F0A090',//ff4e50
                        color: '#fff',
                        customClass: {
                            popup: 'colored-toast'
                        }
                    }); */
                    Toast.fire({
                        icon: 'error',
                        title: '💥 Session Expired!',
                        background: '#ff4e50', // 🔴 vibrant red
                        color: '#fff',         // white text
                        iconColor: '#fff',     // white icon
                        timer: 3000,           // show for 3 seconds
                        timerProgressBar: true,
                        customClass: {
                            popup: 'colored-toast',
                            title: 'text-lg font-semibold', // slightly bigger title text
                        }
                    });

                    //--------------------- TOAST ----------------------------
                    // ⏳ Delay redirect until toast finishes
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 5000);
                }
            });

    }, []);

    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-4xl font-bold text-green-600 mb-6 text-center">
          Welcome to the Dashboard
        </h1>

        {decoded && (
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 mt-6">
            <h3 className="text-lg font-semibold mb-2 text-green-600">
              JWT Token{" "}
              <a
                href="https://www.jwt.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-red-500 animate-pulse
               hover:animate-bounce hover:text-red-700
               transition-colors duration-300"
              >
                [ https://www.jwt.io/ ]
              </a>
            </h3>
            <div className="text-sm break-all mb-4 bg-gray-100 p-2 rounded">
              {token}
            </div>

            <h3 className="text-lg font-semibold mb-2 text-blue-600">
              Decoded Token Details
            </h3>
            <table className="w-full text-sm table-auto border border-collapse border-gray-300">
              <tbody>
                {Object.entries(decoded).map(([key, value]) => (
                  <tr key={key} className="border-b border-gray-200">
                    <td className="font-medium p-2 capitalize">{key}</td>
                    <td className="p-2">
                      {typeof value === "number" &&
                      (key === "iat" || key === "exp")
                        ? new Date(value * 1000).toLocaleString()
                        : JSON.stringify(value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl shadow-inner">
              <h4 className="text-md font-semibold text-blue-800 mb-2">
                User Role
              </h4>
              <p className="text-sm bg-white p-2 rounded border">
                {decoded.role || "N/A"}
              </p>

              <h4 className="text-md font-semibold text-blue-800 mt-4 mb-2">
                Permissions
              </h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {(Array.isArray(decoded.permissions)
                  ? decoded.permissions
                  : []
                ).map((perm, i) => (
                  <li key={i} className="bg-white p-1 rounded border">
                    {perm}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
}
