import axios from 'axios';
import { getCurrentUser } from './authService';

// Base URL for the API
const BASE_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
    const user = getCurrentUser(); 
    return user ? user : null; 
};

export const getNotification = async (userId) => {
    const authToken = getToken();

    if (!authToken) {
        return false;
    }
    try {
        const response = await axios.post(`${BASE_URL}/api/notifications/unread-notification`, {
            userId,
        },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json", // Explicitly set Content-Type
                },
            }
        );
        
        return response;
    } catch (error) {
        console.error("Error fetching notification:", error.response?.data || error.message);
    }
}
export const markReadNotification = async (userId) => {
    const authToken = getToken();

    if (!authToken) {
        return false;
    }
    try {
        const response = await axios.post(`${BASE_URL}/api/notifications/markAsViewed`, {
            userId,
        },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json", // Explicitly set Content-Type
                },
            }
        );

    } catch (error) {
        console.error("Error fetching notification:", error.response?.data || error.message);
    }
}