import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../admincomponents/sidebar';
import Header from '../admincomponents/Header';
import Home from '../admin pages/Home';
import AboutPage from '../admin pages/About';
import Services from '../admin pages/Services';
import Products from '../admin pages/Products';
import Crouselimg from '../admin pages/crouselimg';
import Pets from '../admin pages/Pets';
import Application from '../admin pages/Application';
import AppointmentPage from '../admin pages/Appointments';

import Setting from '../admin pages/Setting';
import OrderHistory from '../admin pages/OrderHistory';
import AdminProtectedRoutes from './AdminProtectedRoutes.jsx';

const Adminpannel = () => {
  return (
    <>
      <Header />
      <div className="flex w-full">
        <Sidebar />

          <Routes>
            <Route element={<AdminProtectedRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/service" element={<Services />} />
              <Route path="/product" element={<Products />} />
              <Route path="/crusal-image" element={<Crouselimg />} />
              <Route path="/pet" element={<Pets />} />
              <Route path="/application" element={<Application />} />
              <Route path="/appointment" element={<AppointmentPage />} />
              <Route path="/settings" element={<Setting />} />
              <Route path="/order-history" element={<OrderHistory />} />
            </Route>
          </Routes>
       
      </div>
    </>
  );
};

export default Adminpannel;
