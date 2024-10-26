import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../../services/authHelpers';

const PrivateRoute = () => {
    const token = getToken(); // Ensure this is a function call

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
