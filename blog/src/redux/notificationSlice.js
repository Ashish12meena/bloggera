import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
    name:"notification",
    initialState:{
        notificationCount:null,
        notificationData:null,
        
    },
    reducers:{
        setNotification(state,action){
            const {notificationCount,notificationData} = action.payload;
            state.notificationCount=notificationCount;
            state.notificationData=notificationData;
        },
        clearNotification(state){
            state.notificationCount=null;
            state.notificationData=null;
        },
    },
});
export const {setNotification,clearNotification}= notificationSlice.actions
export default notificationSlice.reducer;   