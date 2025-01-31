import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { TokenService } from '../services/TokenService';
import { useDispatch } from 'react-redux';

const PrivateRoute = ({ element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initially null until token check is complete
 const dispatch =  useDispatch()

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await TokenService(dispatch); // Check if the token is valid
      setIsAuthenticated(isValid); // Set the authentication state
    };
    checkAuth();
  }, [dispatch]); // Empty dependency array means this effect runs only once when the component mounts

  if (isAuthenticated === null) {
    // If the authentication state is still loading, you can show a loading indicator
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // If not authenticated, redirect to start page
    return <Navigate to="/start" />;
  }

  // If authenticated, render the element (protected component)
  return element;
};

export default PrivateRoute;
