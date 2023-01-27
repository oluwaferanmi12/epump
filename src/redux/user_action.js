import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userPayload",
  initialState: {
    userPayload: {isLoggedIn: false}
  },
  reducers:{
    saveUser: (state , action) => {
        state.userPayload = action.payload
    }
  }
});

export const companySlice = createSlice({
    name:"companyPayload",
    initialState:{
        companyPayload: {}
    },
    reducers: {
        saveCompany: (state , action) => {
            state.companyPayload = action.payload
        }
    }
})

export const {saveUser} = userSlice.actions

export const {saveCompany} = companySlice.actions;

export const companyReducer =  companySlice.reducer;


export default userSlice.reducer
