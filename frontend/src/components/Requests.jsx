import { useEffect, useState } from "react";
import { SERVER } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux";
import {addRequests} from '../utils/userRequestSlice'
import RequestItem from "./requestItem";


const Requests = () => {
    const dispatch=useDispatch();
    let saved_requests=useSelector((store)=>store.requests.data);

    const getRequests=async()=>{
       const response=await fetch(SERVER+'/user/request/received',{
        credentials:'include'
       })

       if(response.ok){
        const json=await response.json();
        dispatch(addRequests(json.data));
        saved_requests=json.data
       }
       else{
        alert('Error fetching requests')
       }

  }

  useEffect(()=>{
      if(!saved_requests){
      getRequests();
      console.log("fetch called")
      }
  },[])
   
  if(!saved_requests)return<div className="text-center">Loading...</div>
  if(saved_requests.length==0)return<div className="text-center">No requests received</div>
  
  return (
    <div className='flex flex-col gap-6 items-center w-full mt-10'>
      <p className='text-2xl font-semibold'>My Requests</p>
      <div className='flex flex-col items-center w-full gap-6 h-[75vh] overflow-scroll'>
       {saved_requests.map((e)=><RequestItem data={e}/>)}
      </div>
    </div>
  )
}

export default Requests