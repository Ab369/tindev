import React, { useEffect, useState } from 'react'
import ConnectionItem from './ConnectionItem'
import { SERVER } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux';
import { saveConnections } from '../utils/userConnectionsSlice';

const Connections = () => {
  const [userConnections,setUserConnections]=useState(null);

  const connectionsData=useSelector((store)=>store.userConnections.data);
  const dispatch=useDispatch();

  const getConnections=async()=>{
     const response=await fetch(SERVER+'/user/connections',{
        credentials:'include'
     });
     const json=await response.json();
     if(response.ok){
        setUserConnections(json.data);
        dispatch(saveConnections(json.data))
     }
     else
     alert(json.message);
  }
  
  useEffect(()=>{
   if(!connectionsData){
   getConnections();
   }
   else
   setUserConnections(connectionsData)
  },[])

  if(!userConnections)return(<div className='text-center'>Loading....</div>);
  if(userConnections.length==0)return<div className='text-center'>You have not made any connections!</div>
  return (
    <div className='flex flex-col gap-6 items-center w-full mt-10'>
      <p className='text-2xl font-semibold'>My Connections</p>
      <div className='flex flex-col items-center w-full gap-6 h-[75vh] overflow-scroll'>
       {
        userConnections.map((user)=>{
            return(
                <ConnectionItem user={user}/>
            )
        })
       }
      </div>
    </div>
  )
}

export default Connections