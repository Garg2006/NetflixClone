import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

export const fetchLogo = createAsyncThunk("logo/fetchLogo", async (movieId) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=ab4277f33df789b3e58cdc46a85b3991&include_image_language=en,null`
    );
    const data = await res.json();
    const logos = { [movieId]: data.logos?.[0].file_path };
    return logos;
  } catch (error) {
    throw error;
  }
});

const logoSlice = createSlice({
  name: "logo",
  initialState: { logoList: {}, status: "" },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogo.fulfilled, (state, action) => {
        state.logoList = { ...state.logoList, ...action.payload };
        state.status = "succeed";
      })
      .addCase(fetchLogo.rejected, (state) => {
        state.status = "failed";
      });
  },
});

const logoState = (state) => state.logos;

export const getMovieLogo = createSelector(
  [logoState],
  (movie) => movie.logoList
);

export default logoSlice.reducer;
