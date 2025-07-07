import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

export const fetchPoster = createAsyncThunk(
  "logo/fetchPoster",
  async (movieId) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=ab4277f33df789b3e58cdc46a85b3991`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      throw err;
    }
  }
);

const posterSlice = createSlice({
  name: "logo",
  initialState: { poster: "", status: "" },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPoster.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPoster.fulfilled, (state, action) => {
        state.poster = action.payload;
        state.status = "succeed";
      })
      .addCase(fetchPoster.rejected, (state) => {
        state.status = "failed";
      });
  },
});

const posterState = (state) => state.poster;
export const getMovie = createSelector(
  [posterState],
  (movie) => movie.poster
);

export default posterSlice.reducer;
