import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postsSlice } from "./postsSlice";
import { todoSlice } from "./todoSlice";
import { favoriteSlice } from "./favoritesSlice";


export type AppStore = typeof store

  
const reducers = combineReducers({
  todos: todoSlice.reducer,
  posts: postsSlice.reducer,
  favorites: favoriteSlice.reducer,
})

export const store = configureStore({
  reducer: reducers
})
