import React from 'react'
import axios from "axios";


import {jwtDecode} from "jwt-decode";
import { setUser } from '../redux/userSlice';
import { getCurrentUser } from './authService';

const getToken = () => {
    const user = getCurrentUser(); // Get the current user from localStorage
    return user ? user : null; // If user exists, return the authToken, else null
};
export const TokenService = async (dispatch) => {
    const authToken = getToken();
    console.log(authToken);
    
    if (!authToken) {
        return false;
    }
    try {
        const response = await axios.get(
            "http://localhost:8080/api/posts/validateToken",
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json", // Explicitly set Content-Type
                },
            }
        );
        if (response.data === "valid") {
            const decodedToken = jwtDecode(authToken); // Decode the JWT
            const username = decodedToken.sub; // Assuming the username is stored in the "sub" field
            console.log("Extracted Username:", username);

            // Dispatch username to Redux
            dispatch(setUser({
                email:username,
            }));

            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}
