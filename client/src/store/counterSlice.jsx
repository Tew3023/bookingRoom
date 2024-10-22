import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 guest: {
    adult: 0,
    children: 0,
    room:0
 }
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setAdult : ((state,action)=>{
        state.guest.adult = action.payload
    }),
    setChildren : ((state,action)=>{
        state.guest.children = action.payload
    }),
    setRoom : ((state,action)=>{
        state.guest.room = action.payload
    })
  },
});

export const { setAdult , setChildren , setRoom } = counterSlice.actions;
export default counterSlice.reducer;