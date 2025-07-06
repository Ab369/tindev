import React, { useEffect, useState } from 'react'
import { SERVER } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeedData} from '../utils/userFeedSlice'
import FeedCard from './FeedCard';

const Feed = () => {
  let storedFeed=useSelector((store)=>store.feed.data);
  const [requestCount,setRequestCount]=useState(0);
  const dispatch=useDispatch();
  const limit=5;

  const getFeedData=async()=>{
    const response=await fetch(SERVER+`/user/feed?page=1&&limit=${limit}`,{
      credentials:'include'
    });
    if(response.ok){
      const json=await response.json();
      const data=json.data;
      console.log(data)
      dispatch(addFeedData(data));
      storedFeed=data;
    }
    else{
      alert('Error fetching feed data');
    }
  }

  

  useEffect(()=>{
     if(!storedFeed ||requestCount==limit-1){
      console.log('called')
      setRequestCount(0)
      getFeedData(); 
     }
  },[requestCount])

  

  if(!storedFeed)
    return <div className='text-center'>Loading...</div>
  if(storedFeed.length==0){
    return<div className='text-center'>No more users in feed</div>
  }

  return (
    <div className='flex items-center justify-center mt-10'>
      <FeedCard feedData={storedFeed[0]} isFeed={true} setRequestCount={setRequestCount}/>
    </div>
  )
}

export default Feed