import { createSlice } from "@reduxjs/toolkit"


type IPost = {
  userId: number,
  id: number,
  title: string,
  body: string
}

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteList: <IPost[]>[],
  },
  reducers: {
    addFavorite: (state, action )=> {
      state.favoriteList.push(action.payload)
    },
    deleteFavorite: (state, action )=> {
      state.favoriteList = state.favoriteList.filter(favorite => favorite.id!== action.payload)
    }
  }
})

export const { addFavorite, deleteFavorite } = favoriteSlice.actions
