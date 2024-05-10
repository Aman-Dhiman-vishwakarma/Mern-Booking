import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk("signupUser", async (userdata) => {
    const responce = await fetch("/api/auth/signup", {
        method:'POST',
        body: JSON.stringify(userdata),
        headers:{'content-type':'application/json'}
    });
    return responce.json();
})

export const loginUser = createAsyncThunk("loginUser", async (userdata) => {
    const responce = await fetch("/api/auth/login", {
        method:'POST',
        body: JSON.stringify(userdata),
        headers:{'content-type':'application/json'}
    });
    return responce.json();
})

export const logedinUserInfo = createAsyncThunk("logedinUserInfo", async () => {
    const responce = await fetch("/api/auth/me");
    return responce.json();
  });

  export const logedout = createAsyncThunk("logedout", async () => {
    const responce = await fetch("/api/auth/logout", {
        method:'POST',
        headers:{'content-type':'application/json'}
    });
    return responce.json();
})

// export const updateuser = createAsyncThunk("updateuser", async (userdata) => {
//   const responce = await fetch("/api/users/update", {
//       method:'POST',
//       body: JSON.stringify(userdata),
//       headers:{'content-type':'application/json'}
//   });
//   return responce.json();
// })

const authSlice = createSlice({
    name: "auth",
    initialState:{
        isLoading: false,
        loginsignupstatus: null,
        logedinUser: null  
    },
    extraReducers: (builder) => {
        builder
        .addCase(signupUser.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(signupUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.loginsignupstatus = action.payload;
        })
        .addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.loginsignupstatus = action.payload;
          })
          .addCase(logedinUserInfo.pending, (state, action) => {
            state.isLoading = true;
          })
          .addCase(logedinUserInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.logedinUser = action.payload;
          })  
          .addCase(logedout.pending, (state, action) => {
            state.isLoading = false;
          })
          .addCase(logedout.fulfilled, (state, action) => {
            state.isLoading = false;
            if(action.payload.messege === "Logout"){
              state.logedinUser = null;
              state.loginsignupstatus = null;
            } 
          })  
          // .addCase(updateuser.pending, (state, action) => {
          //   state.isLoading = false;
          // })
          // .addCase(updateuser.fulfilled, (state, action) => {
          //   state.isLoading = false;
          //   state.logedinUser = action.payload;
          // })  
    }
})


export default authSlice;