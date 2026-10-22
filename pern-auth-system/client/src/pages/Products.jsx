import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [permissions, setPermissions] = useState([]);

    //FOR SUBSEQUENT REQUESTS ATTACH JWT TOKEN IN HEADERS
    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/products', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(res.data);

            const decoded = JSON.parse(atob(token.split('.')[1]));//atob() - ascii to binary function
            setPermissions(decoded.permissions);
        } catch (err) {
            alert('Access Denied or Error Fetching Products');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (!permissions.includes('delete')) {
            return alert('You do not have delete permission');
        }
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(products.filter((p) => p.id !== id));
        } catch (err) {
            alert('Delete failed');
        }
    };

    const handleEdit = async (product) => {
        if (!permissions.includes('write')) {
            return alert('You do not have edit permission');
        }

        //prompt() is a built-in JavaScript function that displays a small dialog box in the browser 
        //asking the user to input some text.

        const name = prompt('Enter new name:', product.name);
        if (name === null) return;

        const priceInput = prompt('Enter new price:', product.price);
        if (priceInput === null || isNaN(priceInput)) return;

        const description = prompt('Enter new description:', product.description);
        if (description === null) return;

        const image = prompt('Enter new image URL:', product.image);
        if (image === null) return;

        const updated = {
            ...product,
            name,
            price: parseFloat(priceInput),
            description,
            image,
        };

        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/products/${product.id}`, updated, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(products.map((p) => (p.id === product.id ? updated : p)));
        } catch (err) {
            alert('Update failed');
        }
    };

    const handleAdd = async () => {
        if (!permissions.includes('write')) {
            return alert('You do not have add permission');
        }

        const name = prompt('Enter product name:');
        if (!name) {
            return alert('Product name is required');
        }

        const priceInput = prompt('Enter product price:');
        if (!priceInput) {
            return alert('Product price is required');
        }
        if (isNaN(priceInput)) {
            return alert('Product price must be a number');
        }

        const description = prompt('Enter product description:');
        if (!description) {
            return alert('Product description is required');
        }

        const image = prompt('Enter product image URL:');
        if (!image) {
            return alert('Product image URL is required');
        }

        const newProduct = {
            name,
            price: parseFloat(priceInput),
            description,
            image,
        };

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return alert('You must be logged in to add a product');
            }

            const res = await axios.post('http://localhost:5000/api/products', newProduct, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setProducts([...products, res.data]);
            alert('Product Added Successfully');
        } catch (err) {
            alert('Failed to add product');
        }
    };


    return (
        <div className="max-w-6xl mx-auto mt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Product List</h2>
                {permissions.includes('write') && (
                    <button
                        onClick={handleAdd}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-xl font-bold"
                        title="Add Product"
                    >
                        ＋
                    </button>
                )}
            </div>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Image</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Description</th>
                        {permissions.includes('write') && <th className="border px-4 py-2">Edit</th>}
                        {permissions.includes('delete') && <th className="border px-4 py-2">Delete</th>}
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod) => (
                        <tr key={prod.id}>
                            <td className="border px-4 py-2">
                                <img
                                    src={prod.image || 'https://i.ytimg.com/vi/ldYcgPKEZC8/sddefault.jpg'}
                                    alt={prod.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                            </td>
                            <td className="border px-4 py-2">{prod.name}</td>
                            <td className="border px-4 py-2">
                                ₹{!isNaN(Number(prod.price)) ? Number(prod.price).toFixed(2) : prod.price}
                            </td>
                            <td className="border px-4 py-2">{prod.description}</td>
                            {permissions.includes('write') && (
                                <td
                                    className="border px-4 py-2 text-blue-600 cursor-pointer hover:underline"
                                    onClick={() => handleEdit(prod)}
                                >
                                    Edit
                                </td>
                            )}
                            {permissions.includes('delete') && (
                                <td
                                    className="border px-4 py-2 text-red-600 cursor-pointer hover:underline"
                                    onClick={() => handleDelete(prod.id)}
                                >
                                    Delete
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
