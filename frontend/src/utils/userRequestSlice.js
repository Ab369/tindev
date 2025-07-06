import { createSlice } from "@reduxjs/toolkit";


const requestSlice=createSlice({
    name:'requests',
    initialState:{
        data:null
    },
    reducers:{
        addRequests:(state,action)=>{
           state.data=action.payload
        },
        removeRequests:(state,action)=>{
            state.data=null
        },
        removeRequestId:(state,action)=>{
            state.data=state.data.filter((e)=>e._id!=action.payload);
        }
    }
})

export const {addRequests,removeRequests,removeRequestId}=requestSlice.actions;
export default requestSlice.reducer