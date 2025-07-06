import React from 'react'
import { SERVER } from '../utils/constant';
import { removeFeedDataById } from '../utils/userFeedSlice';
import { useDispatch } from 'react-redux';

const FeedCard = ({feedData,isFeed,setRequestCount}) => {
  const dispatch=useDispatch();

  let feedSkills=feedData.skills;
  if(typeof(feedSkills)=='string'){
    feedSkills=feedSkills.split(',')
  }

  const handleClick=async(status,toId)=>{
     const response=await fetch(SERVER+`/request/send/${status}/${toId}`,{
      method:'POST',
      credentials:'include'
     });
     if(response.ok){
       console.log('request send succesfully')
       dispatch(removeFeedDataById(feedData._id))
       setRequestCount((prev)=>prev+1);
     }
     else{
      const json=await response.json();
      console.log(json.message)
     }
  }

  return (
    <div className="card bg-base-100 w-96 shadow-sm border-2">
  <figure className='p-2'>
    <img className='h-72 rounded-lg'
      src={feedData.photo}
      alt="profile image" />
  </figure>
  <div className="card-body flex flex-col gap-4">
    <h2 className="card-title">
      {feedData.firstName+' '+feedData.lastName}
      <div className="badge badge-warning">{feedData.username}</div>
    </h2>
    <p className='w-full whitespace-normal break-words'>{feedData?.about?.substring(0,180)||'No about'}</p>
    <div className="card-actions">
      {   
        feedSkills?.map? (feedSkills.map(skill => {
            return(
      <div className="badge badge-outline">{skill}</div>)
        })):'No skills'
      }
    </div>
    <div className='flex justify-around pt-5'>
        <button className="btn btn-secondary" onClick={()=>{
          if(isFeed)handleClick('interested',feedData._id)
        }}>Interested</button>
        <button className="btn btn-primary" onClick={()=>{
          if(isFeed)handleClick('ignored',feedData._id)
        }}>Ignore</button>
    </div>
  </div>
</div>
  )
}

export default FeedCard