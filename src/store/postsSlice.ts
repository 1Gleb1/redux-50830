import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"



const fetchPosts = async () => {
  const response = await axios("https://jsonplaceholder.typicode.com/posts")
  return response.data
}

export const getPosts = createAsyncThunk('posts/get-all', async(_, thunkAPI) => {
  try {
    const response = await fetchPosts()
    console.log(response);

    return response
  }
  catch (error: any) {
    thunkAPI.fulfillWithValue(error.message)
  }
}) 


export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    loading: false,
    error: null,
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getPosts.pending, (state) => {
      state.loading = true; 
    })
    .addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload
    })
    .addCase(getPosts.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.posts = []
    })
  }
})






