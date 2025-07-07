import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: { uid: "", email: "" },
  },
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
  },
});

export const getUserData = (state) => state.user.data.email.split("@")[0] || "User"; 
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
