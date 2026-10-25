import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: '', permissions: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('http://localhost:5000/api/auth/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(res.data);
            setUsers(res.data);
        } catch (err) {
            setError('You are not authorized to view this page.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/auth/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(user => user.id !== id));
        } catch {
            alert('Failed to delete user');
        }
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            permissions: Array.isArray(user.permissions) ? user.permissions.join(',') : user.permissions
        });
    };

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:5000/api/auth/users/${editingUser.id}`, {
                ...formData,
                permissions: formData.permissions.split(',').map(p => p.trim())
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEditingUser(null);
            fetchUsers();
        } catch {
            alert('Failed to update user');
        }
    };

    if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

    return (
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Admin Panel - User List
        </h2>
        <table className="w-full border border-collapse border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Permissions</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  {Array.isArray(user.permissions)
                    ? user.permissions.join(", ")
                    : user.permissions}
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => openEditModal(user)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
              <h3 className="text-xl font-bold mb-4">
                Edit User [read,write,delete]
              </h3>
              <div className="space-y-3">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Name"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Email"
                />
                <input
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Role (e.g., admin)"
                />
                <input
                  name="permissions"
                  value={formData.permissions}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Permissions (comma-separated)"
                />
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => setEditingUser(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}
