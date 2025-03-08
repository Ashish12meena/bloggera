import axios from 'axios';
import { getCurrentUser } from './authService';

const BASE = import.meta.env.VITE_API_URL;
// Base URL for the API
const BASE_URL = `${BASE}/api/comments`;

const getToken = () => {
  const user = getCurrentUser();
  return user ? user : null;
};

export const getCommentDetailsById = async ({ commentId }) => {

  const authToken = getToken();
  

  if (!authToken) {
    return false;
  }
  try {
    const response = await axios.post(
      `${BASE_URL}/commentCard`,
      { commentId },
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Add the Bearer token in the Authorization header
        },
      }
    );

    
    return response.data; // Return the data part of the response
  } catch (error) {
    console.error('Error fetching card details:', error);
    throw error; // Re-throw the error for further handling
  }
};

export const submitComment = async ({data}) => {
  
  const authToken = getToken();

  if (!authToken) {
    return false;
  }

  
  try {
    // const payload = data;
    const response = await axios.post(
      `${BASE_URL}/addComment`,
      data,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Add the Bearer token in the Authorization header
        },
      }
    );

    
    return response; // Return the data part of the response
  } catch (error) {
    console.error('Error fetching card details:', error);
    throw error; // Re-throw the error for further handling
  }
}
