import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDetail = createAsyncThunk(
  "detail/fetchDetail",
  async (movieId) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=ab4277f33df789b3e58cdc46a85b3991&append_to_response=credits,release_dates`
      );
      const data = await res.json();
      const genres = data.genres.map((item) => item.name);
      const releaseDate = data.release_date.split("-")[0];
      const runtime = data.runtime;
      let ageRating = "N/A";
      if (data.release_dates?.results) {
        const certification = data.release_dates.results.find(
          (region) => region.iso_3166_1 === "US"
        )?.release_dates[0]?.certification;
        ageRating = certification || "N/A";
      }
      let castNames = [];
      if (data?.credits?.cast) {
        data?.credits?.cast.map(
          (cast) => (castNames = [...castNames, cast.name])
        );
      }

      return {
        [movieId]: {
          genres,
          releaseDate,
          ageRating,
          runtime,
          castNames,
        },
      };
    } catch (error) {
      throw error;
    }
  }
);

const movieDetailSlice = createSlice({
  name: "detail",
  initialState: { detailList: {} },
  extraReducers: (builder) => {
    builder.addCase(fetchDetail.fulfilled, (state, action) => {
      state.detailList = { ...state.detailList, ...action.payload };
    });
  },
});

export const getAllMovieDetail = (state) => state.detail.detailList;

export default movieDetailSlice.reducer;
