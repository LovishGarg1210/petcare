import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import axios from 'axios';

function AboutPage() {
    const [aboutData, setAbout] = useState([]);
    const [newData, setNewData] = useState({
        heading: '',
        paragraph: '',
        image: null,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewData({
            ...newData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewData({
            ...newData,
            image: file,
        });
    };

    useEffect(() => {
        const Getdata = async () => {
            try {
                const response = await axios.get("https://petcare-1.onrender.com/About/Get");
                if (response) {
                    setAbout(response.data.data);
                } else {
                    console.log("Invalid data format received");
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        Getdata();
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editingId) {
                response = await axios.put(`https://petcare-1.onrender.com/About/Update/${editingId}`, newData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                response = await axios.post("https://petcare-1.onrender.com/About/Save", newData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            if (response) {
                alert('Data Saved Successfully');
                setIsModalOpen(false);
                setEditingId(null);
                setNewData({ heading: '', paragraph: '', image: null });
                await Getdata();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (data) => {
        setNewData({
            heading: data.heading,
            paragraph: data.paragraph,
            image: null,
        });
        setEditingId(data._id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this data?");
        if (confirmDelete) {
            try {
                await axios.delete(`https://petcare-1.onrender.com/About/Delete/${id}`);
                alert('Data deleted successfully');
                await Getdata();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="min-h-screen ml-0 md:ml-64 mt-16 p-6 w-full">
            <div className='flex flex-row md:flex-row justify-between items-center mt-5 md:mt-0'>
                <h1 className="text-3xl font-semibold mb-6 text-center md:text-left">About Page</h1>

                {/* Add Data Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-yellow-500 text-white p-3 rounded-lg mb-6 flex items-center md:space-x-2"
                >
                    <Plus />
                    <span className='hidden md:block'>Add New Data</span>
                </button>
            </div>

            {/* About Data Table */}
            <div className="overflow-x-auto p-6 rounded-lg shadow-md ">
                <h3 className="text-xl font-semibold text-black mb-4">About Data Table</h3>
                <table className="min-w-full table-auto text-black">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Heading</th>
                            <th className="px-4 py-2 border-b hidden md:table-cell">Paragraph</th> {/* Hidden on mobile */}
                            <th className="px-4 py-2 border-b">Image</th>
                            <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(aboutData) && aboutData.length > 0 ? (
                            aboutData.map((data) => (
                                <tr key={data._id} className="text-center">
                                    <td className="px-4 py-2 border-b">{data.heading}</td>
                                    <td className="px-4 py-2 border-b hidden md:table-cell">{data.paragraph}</td> {/* Hidden on mobile */}
                                    <td className="px-4 py-2 text-center border-b">
                                        {data.image && (
                                            <img
                                                src={data.image}
                                                alt={data.heading}
                                                className="w-full h-20 bg-cover rounded-lg"
                                            />
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border-b space-x-3">
                                        <button
                                            className="text-yellow-500 hover:text-black"
                                            onClick={() => handleEdit(data)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-black hover:text-yellow-500"
                                            onClick={() => handleDelete(data._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl mx-4">
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            {editingId ? "Edit" : "Add"} About Data
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="heading"
                                value={newData.heading}
                                onChange={handleInputChange}
                                placeholder="Heading"
                                className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4"
                                required
                            />
                            <textarea
                                name="paragraph"
                                value={newData.paragraph}
                                onChange={handleInputChange}
                                placeholder="Paragraph"
                                className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4"
                                required
                            />
                            <input
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                                className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4"
                            />
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white p-3 rounded-lg"
                                >
                                    {editingId ? "Update" : "Add"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-red-500 text-white p-3 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AboutPage;
