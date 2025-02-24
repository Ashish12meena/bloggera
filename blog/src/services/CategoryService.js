import axios from 'axios';
import { getCurrentUser } from './authService';


const BASE_URL = 'http://localhost:8080/api/category';

const getToken = () => {
    const user = getCurrentUser(); 
    return user ? user : null; 
};

export const  getCategories = async () => {

    const authToken = getToken();
    
    
    if (!authToken) {
        return false;
    }
  try {
    const response = await axios.post(
      `${BASE_URL}/list`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      }
    );
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error('Error fetching card details:', error);
    throw error; 
  }
};
