import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TokenService } from "../services/TokenService";
import { useDispatch } from "react-redux";

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await TokenService(dispatch);
      console.log(isValid, " is valid or not");
        setIsAuthenticated(isValid);
      
    };
    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated === false) {
      console.log("In not auth");
      navigate("/start");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return <div></div>;
  }

  return isAuthenticated ? element : null;
};

export default PrivateRoute;
