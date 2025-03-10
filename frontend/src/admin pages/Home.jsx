import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingCart, Users, Bone } from 'lucide-react';

const Home = () => {
  const [showStatsModal, setShowStatsModal] = useState(false);

  // Sample data for charts
  const salesData = [
    { month: 'Jan', sales: 12000, orders: 150, customers: 120 },
    { month: 'Feb', sales: 15000, orders: 180, customers: 150 },
    { month: 'Mar', sales: 18000, orders: 220, customers: 180 },
    { month: 'Apr', sales: 16000, orders: 190, customers: 160 },
    { month: 'May', sales: 21000, orders: 250, customers: 200 },
    { month: 'Jun', sales: 24000, orders: 280, customers: 230 }
  ];

  const productCategories = [
    { category: 'Food', sales: 45000 },
    { category: 'Toys', sales: 28000 },
    { category: 'Healthcare', sales: 35000 },
    { category: 'Accessories', sales: 22000 },
    { category: 'Grooming', sales: 18000 }
  ];

  const recentOrders = [
    { id: '1', customer: 'John D.', product: 'Premium Dog Food', amount: 89.99, status: 'Delivered' },
    { id: '2', customer: 'Sarah M.', product: 'Cat Toys Bundle', amount: 45.50, status: 'Processing' },
    { id: '3', customer: 'Mike R.', product: 'Pet Shampoo', amount: 24.99, status: 'Shipped' },
    { id: '4', customer: 'Emma L.', product: 'Bird Cage', amount: 129.99, status: 'Processing' }
  ];

  return (
    <div className="p-6 w-[85%] ml-64 mt-16 mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pet Care Dashboard</h1>
        <button 
          onClick={() => setShowStatsModal(true)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-500 transition-colors"
        >
          View Details
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">$106,000</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <ShoppingCart className="h-8 w-8 text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Orders</p>
              <h3 className="text-2xl font-bold">1,270</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Customers</p>
              <h3 className="text-2xl font-bold">1,040</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Bone className="h-8 w-8 text-orange-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Products</p>
              <h3 className="text-2xl font-bold">456</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Monthly Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Sales ($)" />
                <Line type="monotone" dataKey="orders" stroke="#82ca9d" name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Sales by Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productCategories}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#f59e0b" name="Sales ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Order ID</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Product</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="p-4">{order.id}</td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4">{order.product}</td>
                    <td className="p-4">${order.amount}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Detailed Statistics</h2>
              <button 
                onClick={() => setShowStatsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Monthly Growth Rate: +15%<br />
                Customer Retention: 85%<br />
                Average Order Value: $83.45<br />
                Top Selling Category: Pet Food<br />
                Active Customers: 1,040
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowStatsModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;