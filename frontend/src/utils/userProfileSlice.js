import { createSlice } from "@reduxjs/toolkit";

const profileSlice=createSlice({
    name:'profile',
    initialState:{
        data:null
    },
    reducers:{
        saveProfile:(state,action)=>{
            state.data=action.payload;
        },

        removeProfile:(state,action)=>{
            state.data=null
        }
    }
})

export const {saveProfile,removeProfile}=profileSlice.actions;
export default profileSlice.reducer