import React, { useState } from 'react'
import { SERVER } from '../utils/constant'

const ChangePassword = ({setShowPassChange}) => {
    const[oldPass,setOldPass]=useState('')
    const[newPass,setNewPass]=useState('')

    const handleClick=async()=>{
        const response=await fetch(SERVER+'/profile/changePassword',{
            method:'PATCH',
            credentials:'include',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                oldPassword:oldPass,
                newPassword:newPass
            })
            
        })

        const json=await response.json();
        alert(json.message)
        if(response.ok){
            setShowPassChange(false)
        }
    }
  return (
    <div className='flex flex-col bg-base-300 p-30 gap-6 rounded-lg '>
        <input type="text" placeholder="Enter old password" className="input" value={oldPass} onChange={(e)=>setOldPass(e.target.value)} />
        <input type="text" placeholder="New Password" className="input" value={newPass} onChange={(e)=>setNewPass(e.target.value)}/>
        <button className="btn btn-active btn-primary" onClick={handleClick}>Change Password</button>
        <button className="btn btn-active" onClick={()=>{
            setShowPassChange(false);
        }}>Close</button>
    </div>
  )
}

export default ChangePassword