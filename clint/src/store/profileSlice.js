import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const usersProfileInfo = createAsyncThunk("usersProfileInfo", async (username) => {
    const responce = await fetch("/api/users/profile/"+username);
    return responce.json();
})

export const usernotifications = createAsyncThunk("usernotifications", async () => {
    const responce = await fetch("/api/notifications/");
    return responce.json();
})

export const deleteallnotifications = createAsyncThunk("deleteallnotifications", async (deletdata) => {
    const responce = await fetch("/api/notifications/", {
        method:'DELETE',
        headers:{'content-type':'application/json'}
    });
    return responce.json();
  })

  export const followunfollouser = createAsyncThunk("followunfollouser", async (userdata) => {
    const responce = await fetch("/api/users//follow/"+userdata, {
        method:'POST',
        headers:{'content-type':'application/json'}
    });
    return responce.json();
  })
 
  export const rightbaarfollow = createAsyncThunk("rightbaarfollow", async (userdata) => {
    const responce = await fetch("/api/users//follow/"+userdata, {
        method:'POST',
        headers:{'content-type':'application/json'}
    });
    return responce.json();
  })

  export const suggesteduser = createAsyncThunk("suggesteduser", async () => {
    const responce = await fetch("/api/users/suggested/");
    return responce.json();
})

export const updateuser = createAsyncThunk("updateuser", async (userdata) => {
  const responce = await fetch("/api/users/update", {
      method:'POST',
      body: JSON.stringify(userdata),
      headers:{'content-type':'application/json'}
  });
  return responce.json();
})

  
const profileSlice = createSlice({
    name: "usersprofile",
    initialState:{
        isLoading: false,
        imgupdate: false,
        userprofiledata: null,
        notifications: null,
        suggesteduserdata: [],
        userfollowtrue: false
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
        .addCase(usernotifications.pending, (state, action) => {
          state.isLoading = false;
        })
        .addCase(usernotifications.fulfilled, (state, action) => {
          state.isLoading = false;
          state.notifications = action.payload;
        })
        .addCase(deleteallnotifications.pending, (state, action) => {
          state.isLoading = false;
        })
        .addCase(deleteallnotifications.fulfilled, (state, action) => {
          state.isLoading = false;
          state.notifications = null;
        })
        .addCase(followunfollouser.pending, (state, action) => {
          state.isLoading = false;
        })
        .addCase(followunfollouser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.userprofiledata = action.payload.userToModify;
        })
        .addCase(suggesteduser.pending, (state, action) => {
          state.isLoading = false;
        })
        .addCase(suggesteduser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.suggesteduserdata = action.payload;
        })
        .addCase(updateuser.pending, (state, action) => {
          state.imgupdate = true;
        })
        .addCase(updateuser.fulfilled, (state, action) => {
          state.imgupdate = false;
          state.userprofiledata = action.payload;
        })
        .addCase(rightbaarfollow.pending, (state, action) => {
          state.userfollowtrue = false;
        })
        .addCase(rightbaarfollow.fulfilled, (state, action) => {
          state.userfollowtrue = true;
          if(state.userprofiledata){
              if(state.userprofiledata._id == action.payload.currentUser._id){
                 state.userprofiledata = action.payload.currentUser;
              }
          }
          const index = state.suggesteduserdata.findIndex(indx=>indx._id == action.payload.userToModify._id)
          state.suggesteduserdata.splice(index, 1, action.payload.userToModify)
        })
    }
})
export const profileaction = profileSlice.actions;
export default profileSlice;