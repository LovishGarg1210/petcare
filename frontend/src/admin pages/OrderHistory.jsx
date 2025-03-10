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
      // Replace this with actual API call to fetch orders
      const orderData = await axios.get("http://localhost:4000/Order/allOrderhistory");
      
      console.log(orderData);
      setOrders(orderData.data.data);
      setFilteredOrders(orderData.data.data); // Initialize filtered orders with all data
    };

    fetchOrders();
  }, []);

  // Filter orders when either email or productId filter changes
  useEffect(() => {
    const filtered = orders.filter(order =>
      order.userEmail.toLowerCase().includes(emailFilter.toLowerCase()) &&
      order.items.some(item => item.productId.toLowerCase().includes(productIdFilter.toLowerCase()))
    );
    setFilteredOrders(filtered);
  }, [emailFilter, productIdFilter, orders]);

  return (
    <div className="mx-auto min-h-screen ml-64 mt-16 py-12 px-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>

      {/* Filter inputs */}
      <div className="flex mb-6 space-x-4">
        <input
          type="text"
          placeholder="Filter by Email"
          className="border p-2 rounded"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Product ID"
          className="border p-2 rounded"
          value={productIdFilter}
          onChange={(e) => setProductIdFilter(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 cursor-pointer">Order ID</th>
              <th className="text-left p-4 cursor-pointer">Email</th>
              <th className="text-left p-4">Product ID</th>
              <th className="text-left p-4">Product Name</th>
              <th className="text-left p-4">Amount</th>
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
                          <td className="p-4" rowSpan={order.items.length}>{order._id}</td>
                          <td className="p-4" rowSpan={order.items.length}>{order.userEmail}</td>
                        </>
                      )}
                      <td className="p-4">{item.productId}</td>
                      <td className="p-4">{item.productName}</td>
                      <td className="p-4">${item.productPrice}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
