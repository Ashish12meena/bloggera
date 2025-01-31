import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name:"user",
    initialState:{
        email:null,
    },
    reducers:{
        setUser(state,action){
            const {email} = action.payload;
            console.log('Dispatching setUser', action.payload);
            state.email=email;
        },
        clearUser(state){
            state.email=null;
        },
    },
});
export const {setUser,clearUser}= userSlice.actions
export default userSlice.reducer;   