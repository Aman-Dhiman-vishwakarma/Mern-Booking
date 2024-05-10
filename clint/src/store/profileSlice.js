import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const usersProfileInfo = createAsyncThunk("usersProfileInfo", async (username) => {
    const responce = await fetch("/api/users/profile/"+username);
    return responce.json();
})

// export const usersPosts = createAsyncThunk("usersPosts", async (username) => {
//     const responce = await fetch("/api/posts/user/"+username);
//     return responce.json();
// })

// export const deletepost = createAsyncThunk("deletepost", async (deletdata) => {
//     const responce = await fetch(`/api/posts/delete/${deletdata}`, {
//         method:'DELETE',
//         headers:{'content-type':'application/json'}
//     });
//     return responce.json();
//   })

const profileSlice = createSlice({
    name: "usersprofile",
    initialState:{
        isLoading: false,
        userprofiledata: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(usersProfileInfo.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(usersProfileInfo.fulfilled, (state, action) => {
          state.isLoading = false;
          state.userprofiledata = action.payload;
        })
        
    }
})
export const profileaction = profileSlice.actions;
export default profileSlice;