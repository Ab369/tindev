import { createSlice } from "@reduxjs/toolkit";

const connectionSlice=createSlice({
    name:'Connections',
    initialState:{
        data:null
    },
    reducers:{
        saveConnections:(state,action)=>{
            state.data=action.payload
        },
        removeConnections:(state,action)=>{
            state.data=null
        },
        pushAConnection:(state,action)=>{ //for adding connections when request accepted by user and we don't need to recall fetch connections
          state.data.push(action.payload)
        }
    }
})

export const{saveConnections,removeConnections,pushAConnection}=connectionSlice.actions;
export default connectionSlice.reducer