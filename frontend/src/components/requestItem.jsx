import { useDispatch } from "react-redux"
import { SERVER } from "../utils/constant"
import {removeRequestId} from '../utils/userRequestSlice'
import {pushAConnection} from '../utils/userConnectionsSlice'

const RequestItem = ({data}) => {
  const dispatch=useDispatch();

  const reviewRequest=async(status)=>{
     const response=await fetch(SERVER+`/request/review/${status}/${data._id}`,{
      method:'POST',
      credentials:'include'
     });
     if(response.ok){
      console.log('ok')
      dispatch(removeRequestId(data._id));
      dispatch(pushAConnection(data.fromId))
     }
     else{
      alert('error reviewing request')
     }
  }

  return (
    <li className="flex gap-12 w-1/2 border-2 justify-center items-center rounded-lg py-2 shadow-lg border-zinc-500">
    <div><img className="size-16 rounded-box" src={data.fromId.photo}/></div>
    <div className='w-44 overflow-hidden'>
      <div>{`${data.fromId.firstName} ${data.fromId.lastName}`}</div>
      <div className="text-xs uppercase text-yellow-200 opacity-60">{data.fromId.username}</div>
      <div className="text-xs uppercase font-semibold opacity-60">{data.fromId.skills.join(',')}</div>
      
    </div>
    <button className="btn btn-default" onClick={()=>reviewRequest('accepted')}>
      Accept
    </button>
    <button className="btn btn-default" onClick={()=>reviewRequest('rejected')}>
      Reject
    </button>
  </li>
  )
}

export default RequestItem