import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getallPosts = createAsyncThunk("getAllPosts", async () => {
    const responce = await fetch("/api/posts/allposts/");
    return responce.json();
})

export const createpost = createAsyncThunk("createpost", async (postdata) => {
  const responce = await fetch("/api/posts/create", {
      method:'POST',
      body: JSON.stringify(postdata),
      headers:{'content-type':'application/json'}
  });
  return responce.json();
})

export const likeunlikepost = createAsyncThunk("likeunlikepost", async (likedata) => {
  const responce = await fetch("/api/posts/like/"+likedata, {
      method:'POST',
      headers:{'content-type':'application/json'}
  });
  return responce.json();
})

export const usersPosts = createAsyncThunk("usersPosts", async (username) => {
  const responce = await fetch("/api/posts/user/"+username);
  return responce.json();
})

export const deletepost = createAsyncThunk("deletepost", async (deletdata) => {
  const responce = await fetch(`/api/posts/delete/${deletdata}`, {
      method:'DELETE',
      headers:{'content-type':'application/json'}
  });
  return responce.json();
})

export const commentpost = createAsyncThunk("commentpost", async ({id, text}) => {
  const responce = await fetch("/api/posts/comment/"+id, {
      method:'POST',
      body: JSON.stringify({text}),
      headers:{'content-type':'application/json'}
  });
  return responce.json();
})

export const followingposts = createAsyncThunk("followingposts", async () => {
  const responce = await fetch("/api/posts/followingposts");
  return responce.json();
})

const allPostSlice = createSlice({
    name: "allposts",
    initialState: {
        isLoading: false,
        allpostsdata: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(getallPosts.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(getallPosts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.allpostsdata = action.payload;
        })
        .addCase(createpost.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(createpost.fulfilled, (state, action) => {
          state.isLoading = false;
          state.allpostsdata.unshift(action.payload)
        })
        .addCase(likeunlikepost.pending, (state, action) => {
          state.isLoading = false;
        })
        .addCase(likeunlikepost.fulfilled, (state, action) => {
          state.isLoading = false;
          const index = state.allpostsdata.findIndex(post=>post._id === action.payload._id)
          state.allpostsdata.splice(index, 1, action.payload)
        })
        .addCase(usersPosts.pending, (state, action) => {
          state.isLoading = true;
        })
      .addCase(usersPosts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.allpostsdata = action.payload;
      })
      .addCase(deletepost.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deletepost.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.allpostsdata.findIndex(item=>item._id === action.payload._id)
        state.allpostsdata.splice(index, 1)
      })
      .addCase(commentpost.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(commentpost.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.allpostsdata.findIndex(item=>item._id === action.payload._id)
        state.allpostsdata.splice(index, 1, action.payload)
      })
      .addCase(followingposts.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(followingposts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allpostsdata = action.payload
      })
        
    }
})

export default allPostSlice;