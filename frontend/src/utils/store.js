import { configureStore } from "@reduxjs/toolkit";
import profileReducer from '../utils/userProfileSlice'
import connectionReducer from '../utils/userConnectionsSlice'
import requestReducer from '../utils/userRequestSlice'
import feedReducer from '../utils/userFeedSlice'

export default configureStore({
    reducer:{
         profile:profileReducer,
         userConnections:connectionReducer,
         requests:requestReducer,
         feed:feedReducer
    }
})