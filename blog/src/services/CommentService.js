import axios from 'axios';
import { getCurrentUser } from './authService';

// Base URL for the API
const BASE_URL = 'http://localhost:8080/api/comments';

const getToken = () => {
    const user = getCurrentUser(); 
    return user ? user : null; 
};

export const  getCommentDetailsById = async ({commentId}) => {

    const authToken = getToken();
    console.log(authToken," In getCardDetails",commentId);
    
    if (!authToken) {
        return false;
    }
  try {
    const response = await axios.post(
      `${BASE_URL}/commentCard`,
      {commentId},
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Add the Bearer token in the Authorization header
        },
      }
    );

    console.log(response.data);
    return response.data; // Return the data part of the response
  } catch (error) {
    console.error('Error fetching card details:', error);
    throw error; // Re-throw the error for further handling
  }
};
