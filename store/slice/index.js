import { configureStore } from "@reduxjs/toolkit";
import allCategoryReducer from "./allCategoriesSlice";
import emailReducer from "./emailSlice";
import userReducer from "./userSlice";
import trailerReducer from "./trailerSlice";
import logoReducer from "./logoSlice";
import posterReducer from "./posterSlice";
import detailReducer from "./movieDetailSlice";
import myListReducer from "./myListSlice";
import myListIdCheckedReducer from "./myListIdCheckedSlice";
import movieSearchReducer from "./searchMovieSlice";
import languageReducer from "./languageSlice";

export const store = configureStore({
  reducer: {
    movieData: allCategoryReducer,
    email: emailReducer,
    user: userReducer,
    trailer: trailerReducer,
    logos: logoReducer,
    poster: posterReducer,
    detail: detailReducer,
    myList: myListReducer,
    myListIdChecked: myListIdCheckedReducer,
    search:movieSearchReducer,
    language: languageReducer,
  },
});
