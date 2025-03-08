import axios from "axios";
import { setUser } from "../redux/userSlice";

const BASE = import.meta.env.VITE_API_URL;
const REST_API_BASE_URL = `${BASE}/auth/users`

export const createUsers = async (user) => {
    return axios.post(REST_API_BASE_URL + '/register', user).then((response) => {
        
        if (response.status >= 200 && response.status < 300) {
            localStorage.setItem("authToken", JSON.stringify(response.data.authToken));
        }
        return response.data;
    }).catch((error) => {
        throw error;
    });
}

export const loginUser = async (user,dispatch) => {
    
    return axios.post(REST_API_BASE_URL + '/login', user).then((response) => {
        if (response.data.authToken) {
            localStorage.setItem("authToken", JSON.stringify(response.data.authToken))
            // console.log(response.data);
            dispatch(
                setUser({
                  email:response.data.user.email,
                  userId:response.data.user.userId,
                  username:response.data.user.username,
                  profilePicture:response.data.user.profilePicture,
                })
              );

        }
        
        return response.status;

    }).catch((error) => {
        console.log(error);
        return error.response.data;
    });

}


export const logout = async () => {
    localStorage.removeItem("authToken");
    return axios.post(REST_API_BASE_URL + "logout").then((response) => {
        return response.data;
    });
};

// Function to get the current user from localStorage
export const getCurrentUser = () => {
    const user = localStorage.getItem("authToken");
    if (!user) {
        return null; // If no user found, return null
    }
    return JSON.parse(user); // Parse the user if found
};


