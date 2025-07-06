import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:'feed',
    initialState:{
        data:null
    },
    reducers:{
        addFeedData:(state,action)=>{
            state.data=action.payload
        },
        removeFeedData:(state,action)=>{
            state.data=null
        },
        removeFeedDataById:(state,action)=>{
            state.data=state.data.filter((e)=>e._id!=action.payload)
        }
    }
})

export const{addFeedData,removeFeedData,removeFeedDataById}=feedSlice.actions;
export default feedSlice.reducer