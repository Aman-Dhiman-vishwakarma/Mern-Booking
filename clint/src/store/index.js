import {configureStore} from "@reduxjs/toolkit"; 
import authSlice from "./authSlice";
import profileSlice from "./profileSlice";
import allPostSlice from "./allPostsSlice";


const store = configureStore({
    reducer: {
         auth: authSlice.reducer,
         usersprofile: profileSlice.reducer,
         allposts: allPostSlice.reducer
    }
})

export default store;