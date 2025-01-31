import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Ensure this path is correct

// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer, // Key should match the state slice name
  },
});

export default store;
    