import React from 'react'
import axios from "axios";


import { jwtDecode } from "jwt-decode";
import { setUser } from '../redux/userSlice';
import { getCurrentUser } from './authService';

const getToken = () => {
    const user = getCurrentUser(); // Get the current user from localStorage
    return user ? user : null; // If user exists, return the authToken, else null
};
const BASE_URL = import.meta.env.VITE_API_URL;
export const TokenService = async (dispatch) => {
    const authToken = getToken();

    if (!authToken) {
        return false;
    }
    const decodedToken = jwtDecode(authToken);
    const email = decodedToken.sub;


    try {
        const response = await axios.post(
            `${BASE_URL}/api/users/validateToken`,
            { email },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json", // Explicitly set Content-Type
                },
            }
        );

        if (response.status === 200) {

            dispatch(setUser({
                email: response.data.email,
                username: response.data.username,
                profilePicture: response.data.profilePicture,
                userId: response.data.userId,
            }));

            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}

export const saveTokenToBackend = async (userId, fcmToken) => {
    const authToken = getToken();

    if (!authToken) {
        return false;
    }
    try {
        const response = await axios.post(`${BASE_URL}/api/users/save-fcm-token`, {
            userId,
            fcmToken,
        },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json", // Explicitly set Content-Type
                },
            }
        );
    } catch (error) {
        console.error("Error saving token:", error.response?.data || error.message);
    }
}