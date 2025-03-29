import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [emailFilter, setEmailFilter] = useState('');
  const [productIdFilter, setProductIdFilter] = useState('');

  // Fetch order history (mocked data here, replace with actual API call)
  useEffect(() => {
    const fetchOrders = async () => {
      const orderData = await axios.get('https://petcare-1.onrender.com/Order/allOrderhistory');
      setOrders(orderData.data.data);
      setFilteredOrders(orderData.data.data); // Initialize filtered orders with all data
    };

    fetchOrders();
  }, []);

  // Filter orders when either email or productId filter changes
  useEffect(() => {
    const filtered = orders.filter((order) =>
      order.userEmail.toLowerCase().includes(emailFilter.toLowerCase()) &&
      order.items.some((item) => item.productId.toLowerCase().includes(productIdFilter.toLowerCase()))
    );
    setFilteredOrders(filtered);
  }, [emailFilter, productIdFilter, orders]);

  return (
    <div className="mx-auto min-h-screen md:ml-64 mt-20 md:mt-16 py-12 px-4 w-full">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Order History</h1>

      {/* Filter inputs */}
      <div className="flex flex-col md:flex-row mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Filter by Email"
          className="border p-2 rounded w-full md:w-1/2"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Product ID"
          className="border p-2 rounded w-full md:w-1/2"
          value={productIdFilter}
          onChange={(e) => setProductIdFilter(e.target.value)}
        />
      </div>

      {/* Order Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 text-xs md:text-base">Order ID</th>
              <th className="text-left p-4 text-xs md:text-base">Email</th>
              <th className="text-left p-4 text-xs md:text-base">Product ID</th>
              <th className="text-left p-4 text-xs md:text-base">Product Name</th>
              <th className="text-left p-4 text-xs md:text-base">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <React.Fragment key={order._id}>
                  {order.items.map((item, index) => (
                    <tr key={item.productId} className="border-b">
                      {/* Display order details only for the first product row */}
                      {index === 0 && (
                        <>
                          <td className="p-4 text-xs md:text-base" rowSpan={order.items.length}>
                            {order._id}
                          </td>
                          <td className="p-4 text-xs md:text-base" rowSpan={order.items.length}>
                            {order.userEmail}
                          </td>
                        </>
                      )}
                      <td className="p-4 text-xs md:text-base">{item.productId}</td>
                      <td className="p-4 text-xs md:text-base">{item.productName}</td>
                      <td className="p-4 text-xs md:text-base">${item.productPrice}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-xs md:text-base">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
