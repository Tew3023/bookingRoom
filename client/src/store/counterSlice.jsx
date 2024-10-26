import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 guest: {
    adult: 1,
    children: 0,
    room:0
 },
 date: {
  checkin : null,
  checkout : null
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
    }),
    setCheckfirst : ((state,action) => {
      state.date.checkin = action.payload
    }),
    setChecksec : ((state,action) => {
      state.date.checkout = action.payload
    })
    },
});

export const { setAdult , setChildren , setRoom ,setCheckfirst,setChecksec } = counterSlice.actions;
export default counterSlice.reducer;