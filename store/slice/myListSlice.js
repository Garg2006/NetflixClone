import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "myList",
  initialState: { data: [] },
  reducers: {
    addMovieToList(state, action) {
      state.data = [...state.data, action.payload];
    },
    removeMovieFromList(state, action) {
        state.data = state.data.filter((movie) => movie.id !== action.payload.id)
    },
  },
});

export const {addMovieToList, removeMovieFromList} = listSlice.actions

export const getAllMyMovieList = (state) => state.myList.data

export default listSlice.reducer;
