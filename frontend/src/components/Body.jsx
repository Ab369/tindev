import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router'
import Footer from './Footer'
import { useEffect, useState } from 'react'
import { SERVER } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { saveProfile } from '../utils/userProfileSlice'

const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const profileData=useSelector((store)=>store.profile.data);
  
  const getProfile=async()=>{
    try{
      const response=await fetch(SERVER+'/profile/get',{
       credentials: 'include'
      });
      const profile=await response.json();
      if(!response.ok){
        throw new Error(response.message);
      }
      dispatch(saveProfile(profile.data));

    }catch(err){
      console.log(err.message);
      navigate('/login')
    }
  }

  useEffect(()=>{
    if(!profileData)getProfile();
  },[])
  

  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body