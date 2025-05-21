import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

export default function SellPetApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await fetch('http://localhost:4000/SellPet/All');
      const data = await res.json();
      setApplications(data.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:4000/SellPet/status/${id}`, {
        method: 'Put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchApplications();
      }
    } catch (error) {
      console.error(`Failed to ${status} application`, error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <div className="text-center p-10">Loading applications...</div>;

  return (
    <div className="max-w-6xl md:ml-64 mt-20 md:mt-16 py-12 px-4 w-full mx-auto p-6 mt-10 ">
      <h1 className="text-3xl font-bold text-center mb-8">Pet Sale Applications</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {applications.map((app) => (
          <div key={app._id} className="bg-white rounded-lg shadow-lg p-5 relative group transition hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <img src={app.imagePath} alt="pet" className="w-32 h-32 rounded-md object-cover border" />
              <div>
                <h2 className="text-xl font-semibold">{app.petName}</h2>
                <p className="text-gray-600">{app.breed} • {app.age}</p>
                <p className="text-sm text-gray-500">Price: ${app.price}</p>
                <div className="mt-2 text-sm text-gray-700 space-y-1">
                  <p><strong>Health:</strong> {Object.entries(app.health).filter(([_, val]) => val).map(([k]) => k).join(', ') || 'None'}</p>
                  <p><strong>Seller:</strong> {app.sellerInfo?.name}, {app.sellerInfo?.location}</p>
                  <p><strong>Contact:</strong> {app.sellerInfo?.email} | {app.sellerInfo?.phone}</p>
                </div>
              </div>
            </div>

            <div className="absolute top-2 right-2 text-xs uppercase px-2 py-1 rounded bg-gray-100 text-gray-600">
              {app.status || 'pending'}
            </div>

            {app.status === 'pending' && (
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => updateStatus(app._id, 'accepted')}
                  className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded hover:bg-green-200"
                >
                  <Check size={16} /> Accept
                </button>
                <button
                  onClick={() => updateStatus(app._id, 'rejected')}
                  className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded hover:bg-red-200"
                >
                  <X size={16} /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
