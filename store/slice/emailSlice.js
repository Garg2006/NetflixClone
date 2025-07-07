import { createSlice } from "@reduxjs/toolkit";

const emailSlice  = createSlice({
  name: "email",
  initialState:{value:''},
  reducers: {
    setEmail(state,action){
        state.value = action.payload
    }
  },
});

export const getEmail = (state) => state.email.value
export const {setEmail} = emailSlice.actions


export default emailSlice.reducer