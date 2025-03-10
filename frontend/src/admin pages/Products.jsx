import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';

function ProductPage() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        image: null,
        price: '',
        category: '',
        quantity: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);  // Loader for fetch and submit
    
    const fetchData = async () => {
        setLoading(true);  // Set loading true while fetching
        try {
            const response = await axios.get('https://petcare-1.onrender.com/product/Get');
            // Normalize the categories to lowercase when setting them
            const normalizedProducts = response.data.data.map((product) => ({
                ...product,
                category: product.category.toLowerCase(),
            }));
            setProducts(normalizedProducts);
            setCategories([...new Set(normalizedProducts.map((product) => product.category))]);
            setLoading(false); 
        } catch (error) {
            console.error(error);
        }
        setLoading(false); // Set loading false after fetching
    };

    // Fetch products from the backend
    useEffect(() => {
        fetchData();
    }, []);

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value,
        });
    };

    // Handle image file input
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewProduct({
            ...newProduct,
            image: file,
        });
    };

    // Handle category filter change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value.toLowerCase());  // Normalize to lowercase
    };

    // Filter products by category
    const filteredProducts = selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products;

    // Handle Add/Edit Product form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Set loading true while submitting
        try {
            let response;
            const formData = new FormData();
            for (let key in newProduct) {
                formData.append(key, newProduct[key]);
            }
            if (editingId) {
                // Edit existing product
                response = await axios.put(`https://petcare-1.onrender.com/product/Update/${editingId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                // Add new product
                response = await axios.post('https://petcare-1.onrender.com/product/Save', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            if (response) {
                alert('Product saved successfully!');
                setIsModalOpen(false);
                setEditingId(null);
                setNewProduct({
                    name: '',
                    image: null,
                    price: '',
                    category: '',
                    quantity: '',
                });
                fetchData(); // Re-fetch the products
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);  // Set loading false after submitting
    };

    // Handle Edit
    const handleEdit = (product) => {
        setNewProduct({
            name: product.name,
            price: product.price,
            category: product.category,
            quantity: product.quantity,
            image: product.image || null,
        });
        setEditingId(product._id);
        setIsModalOpen(true);
    };

    // Handle Delete
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            try {
                await axios.delete(`https://petcare-1.onrender.com/product/Delete/${id}`);
                alert('Product deleted successfully');
                await fetchData(); // Re-fetch the products after deletion
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Loader component
    const Loader = () => (
        <div className="flex justify-center items-center w-full h-full">
            <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-yellow-500 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen ml-64 mt-16 p-6 w-[100%]">
            {loading && <Loader />} {/* Show loader while loading data */}
            
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold mb-6">Product Page</h1>

                {/* Add Product Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-yellow-500 text-white p-3 rounded-lg mb-6 flex items-center space-x-2"
                >
                    <Plus />
                    <span>Add Product</span>
                </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="p-3 bg-black text-white rounded-lg"
                >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)} {/* Capitalize the first letter */}
                        </option>
                    ))}
                </select>
            </div>

            {/* Product Table */}
            <div className=" p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-black mb-4">Product Table</h3>
                <table className="min-w-full table-auto text-black">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Image</th>
                            <th className="px-4 py-2 border-b">Name</th>
                            <th className="px-4 py-2 border-b">Price</th>
                            <th className="px-4 py-2 border-b">Category</th>
                            <th className="px-4 py-2 border-b">Quantity</th>
                            <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-700 text-center">
                                    <td className="px-4 py-2 border-b">
                                        {product.image && (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border-b">{product.name}</td>
                                    <td className="px-4 py-2 border-b">{product.price}</td>
                                    <td className="px-4 py-2 border-b">
                                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                                    </td>
                                    <td className="px-4 py-2 border-b">{product.quantity}</td>
                                    <td className="px-4 py-2 border-b space-x-3">
                                        <button
                                            className="text-yellow-500 hover:text-yellow-400"
                                            onClick={() => handleEdit(product)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-400"
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">No products available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for Add/Edit Product */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-800 p-6 rounded-lg w-1/2">
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            {editingId ? 'Edit Product' : 'Add Product'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            {/* Form Fields */}
                            <input
                                type="text"
                                name="name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                                placeholder="Product Name"
                                className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white"
                            />
                            <input
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                                className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white"
                            />
                            <input
                                type="number"
                                name="price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                placeholder="Product Price"
                                className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white"
                            />
                            <input
                                type="text"
                                name="category"
                                value={newProduct.category}
                                onChange={handleInputChange}
                                placeholder="Product Category"
                                className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white"
                            />
                            <input
                                type="number"
                                name="quantity"
                                value={newProduct.quantity}
                                onChange={handleInputChange}
                                placeholder="Product Quantity"
                                className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white"
                            />
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="bg-yellow-500 text-white p-3 rounded-lg w-full"
                            >
                                {editingId ? 'Update Product' : 'Add Product'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductPage;
