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

export const {saveUser} = userSlice.actions

export default userSlice.reducer
