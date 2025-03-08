import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Ensure this path is correct
import postReducer from "./postSlice";
import scrollReducer from './scrollSlice'
import notificationReducer from './notificationSlice'

// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
    posts:postReducer,
    scroll: scrollReducer,
    notification:notificationReducer,
  },
});

export default store;
    