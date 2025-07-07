import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const categories = {
  Trending: {
    English:
      "https://api.themoviedb.org/3/trending/movie/day?api_key=ab4277f33df789b3e58cdc46a85b3991",
    Hindi:
      "https://api.themoviedb.org/3/trending/movie/day?api_key=ab4277f33df789b3e58cdc46a85b3991&language=hi",
  },
  Popular: {
    English:
      "https://api.themoviedb.org/3/movie/popular?api_key=ab4277f33df789b3e58cdc46a85b3991&language=en-US&page=1",
    Hindi:
      "https://api.themoviedb.org/3/movie/popular?api_key=ab4277f33df789b3e58cdc46a85b3991&language=hi-IN&page=1",
  },
  TopRated: {
    English:
      "https://api.themoviedb.org/3/movie/top_rated?api_key=ab4277f33df789b3e58cdc46a85b3991&language=en-US&page=1",
    Hindi:
      "https://api.themoviedb.org/3/movie/top_rated?api_key=ab4277f33df789b3e58cdc46a85b3991&language=hi-IN&page=1",
  },
  UpComing: {
    English:
      "https://api.themoviedb.org/3/movie/upcoming?api_key=ab4277f33df789b3e58cdc46a85b3991&language=en-US&page=1",
    Hindi:
      "https://api.themoviedb.org/3/movie/upcoming?api_key=ab4277f33df789b3e58cdc46a85b3991&language=hi-IN&page=1",
  },
  Romantic: {
    English:
      "https://api.themoviedb.org/3/discover/movie?with_genres=10749&api_key=ab4277f33df789b3e58cdc46a85b3991&language=en-US&page=1",
    Hindi:
      "https://api.themoviedb.org/3/discover/movie?with_genres=10749&api_key=ab4277f33df789b3e58cdc46a85b3991&language=hi-IN&page=1",
  },
  Crime: {
    English:
      "https://api.themoviedb.org/3/discover/movie?with_genres=80&api_key=ab4277f33df789b3e58cdc46a85b3991&language=en-US&page=1",
    Hindi:
      "https://api.themoviedb.org/3/discover/movie?with_genres=80&api_key=ab4277f33df789b3e58cdc46a85b3991&language=hi-IN&page=1",
  },
  Animation: {
    English:
      "https://api.themoviedb.org/3/discover/movie?with_genres=16&api_key=ab4277f33df789b3e58cdc46a85b3991&language=en-US&page=1",
    Hindi:
      "https://api.themoviedb.org/3/discover/movie?with_genres=16&api_key=ab4277f33df789b3e58cdc46a85b3991&language=hi-IN&page=1",
  },
};

export const movieThunks = {};

Object.entries(categories).map(([name, url]) => {
  const thunk = createAsyncThunk(`movies/fetch${  name}`, async (language) => {
    try {
      const response = await fetch(url[language]);
      const data = await response.json();
      return data.results;
    } catch (err) {
      throw err;
    }
  });
  movieThunks[name] = thunk;
});

const slice = createSlice({
  name: "movies",
  initialState: Object.keys(categories).reduce((acc, category) => {
    acc[category] = {
      data: [],
      status: "",
    };
    return acc;
  }, {}),
  extraReducers: (builder) => {
    Object.keys(movieThunks).map((name) => {
      builder
        .addCase(movieThunks[name].fulfilled, (state, action) => {
          state[name].data = action.payload;
          state[name].status = true;
        })
        .addCase(movieThunks[name].pending, (state) => {
          state[name].status = false;
        });
    });
  },
});

const selectMovieState = (state) => state;

export const getAllMoviesList = createSelector(
  [selectMovieState],
  (movies) => movies.movieData
);

export default slice.reducer;
