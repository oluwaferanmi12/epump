import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userPayload",
  initialState: {
    userPayload: {name: "David Awodiji"}
  },
  reducers:{
    saveUser: (state) => {
        state.userPayload = {name: "Oluwaferanmi Mark Agba"}
    }
  }
});

export const {saveUser} = userSlice.actions

export default userSlice.reducer
