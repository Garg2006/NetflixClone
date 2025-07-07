import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: { language: "English" },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const getLanguage = (state) => state.language.language 

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
