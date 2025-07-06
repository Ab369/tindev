import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router'
import { removeProfile } from '../utils/userProfileSlice';
import {removeConnections} from '../utils/userConnectionsSlice';
import {removeRequests} from '../utils/userRequestSlice'

import { SERVER } from '../utils/constant';
import { removeFeedData } from '../utils/userFeedSlice';

const Navbar = () => {
  const navigate=useNavigate();
  const profile=useSelector((store)=>store.profile.data);
  const dispatch=useDispatch();

  const handleLogout=async()=>{
            await fetch(SERVER+'/logout',{
                credentials:'include'
            })
            dispatch(removeProfile());
            dispatch(removeConnections());
            dispatch(removeRequests());
            dispatch(removeFeedData())
            navigate('/login')
        }

  return (
    <div className="navbar bg-base-300 shadow-lg sticky top-0 z-10">
  <div className="flex-1" onClick={()=>navigate('/feed')}>
    <a className="btn btn-ghost text-2xl">devMates.</a>
  </div>

  {profile&&<div className='flex gap-10'>
  <div className='flex gap-8'>
     <button className="btn btn-active" onClick={()=>navigate('/connections')}>Connections</button>
     <button className="btn btn-active" onClick={()=>navigate('/requests')}>Requests</button>
  </div>
  <div className="flex gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={profile.photo} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li onClick={()=>navigate('/profile')}>
          <a className="justify-between"  >
            Profile
          </a>
        </li>
        <li><a>Settings</a></li>
        <li onClick={handleLogout}><a>Logout</a></li>
      </ul>
    </div>
  </div>
  </div>}

</div>
  )
}

export default Navbar