import { Outlet, Navigate } from "react-router-dom";
import React from 'react'

const AdminProtectedRoutes = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== "Admin") {
        return <Navigate to={role === "Admin" ? '/' : '/login'} />;
    }

    return <Outlet />;
}

export default AdminProtectedRoutes;
