import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import { Provider } from "react-redux";
import store from "./utils/store";
import Profile from "./components/profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests"
import Signup from "./components/Signup";
const App=()=>{
  return(
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/' element={<Body/>}>
           <Route path='/login' element={<Login/>}/> 
           <Route path='/signup' element={<Signup/>}/> 
           <Route path='/feed' element={<Feed/>}/>
           <Route path='/profile' element={<Profile/>}/>
           <Route path='/connections' element={<Connections/>}/>
           <Route path='/requests' element={<Requests/>}/>
        </Route>
      </Routes>
    </Router>
    </Provider>
  )
}

export default App
