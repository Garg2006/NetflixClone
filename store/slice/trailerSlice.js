import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

export const fetchTrailer = createAsyncThunk(
  "trailer/fetchTrailer",
  async (movieId) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=ab4277f33df789b3e58cdc46a85b3991`
      );
      const data = await res.json();
      const trailer = data.results.find(
        (vid) => vid.type == "Trailer" && vid.site == "YouTube"
      );
      if (trailer) return { [movieId]: trailer.key };
    } catch (error) {
      throw error;
    }
  }
);

const trailerSlice = createSlice({
  name: "trailer",
  initialState: {
    trailerList: {},
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrailer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrailer.fulfilled, (state, action) => {
        state.trailerList = { ...state.trailerList, ...action.payload };
        state.status = "succeed";
      })
      .addCase(fetchTrailer.rejected, (state) => {
        state.status = "failed";
      });
  },
});

const trailerState = (state) => state.trailer;

export const getMovieTrailer = createSelector(
  [trailerState],
  (movie) => movie.trailerList
);

export default trailerSlice.reducer;
