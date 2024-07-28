import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        Signinstart(state) {
            state.loading = true;
            state.error = null;
        },
        Signinsuccess(state, action) {
          state.currentUser = action.payload;
            state.loading = false;
            state.error =null
        },
        Signinfailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
          },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            console.log(",current user",state.currentUser);
            state.loading = false;
            state.error = null;
          },
          deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
          deleteUserStart: (state) => {
            state.loading = true;
            state.error = null;
          },
          deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
          },
          updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
          SignoutSuccess:(state)=>{
            state.currentUser=null,
            state.loading=false,
            state.error=null
          },
    }
})

export const {Signinstart,
  Signinsuccess,
  Signinfailure,
   updateStart,
   updateSuccess,
   updateFailure,
   deleteUserSuccess,
   deleteUserFailure,
   deleteUserStart,
  SignoutSuccess
  } = userSlice.actions;
  
export default userSlice.reducer;