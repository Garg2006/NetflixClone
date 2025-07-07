import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSearch = createAsyncThunk(
  "search/fetchSearch",
  async (movieName) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=ab4277f33df789b3e58cdc46a85b3991&query=${movieName}`
      );
      const data = await res.json();
      return data.results;
    } catch (error) {}
  }
);

const movieSearchSlice = createSlice({
  name: "search",
  initialState: { data: [] },
  reducers: {
    clearSearchedMovie(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const {clearSearchedMovie} = movieSearchSlice.actions

export const getSearchedMovie = (state) => state.search.data;

export default movieSearchSlice.reducer;
