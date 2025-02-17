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
    

    console.log(authToken,"authToken in tokenservice");
    
    
    if (!authToken) {
        return false;
    }
    const decodedToken = jwtDecode(authToken); 
    const email = decodedToken.sub; 
    
    
    try {
        const response = await axios.post(
            "http://localhost:8080/api/users/validateToken",
            {email},
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json", // Explicitly set Content-Type
                },
            }
        );
        
        
        console.log(response," response of authtoken");
        
        if (response.status === 200) {
            

            console.log("token service");
            
            dispatch(setUser({
                email:response.data.email,
                username:response.data.username,
                profilePicture:response.data.profilePicture,
                userId:response.data.userId,
            }));

            return true;
        }
        return false;
    } catch (error) {
        console.log(" token response");    
        return false;
    }
}
