import React from 'react'

const ConnectionItem = ({user}) => {
  const {firstName,lastName,photo,skills,username}=user;

  return (
    <li className="flex gap-12 w-1/2 border-2 justify-center items-center rounded-lg py-2 shadow-lg border-zinc-500">
    <div><img className="size-16 rounded-box" src={photo}/></div>
    <div className='w-44 overflow-hidden'>
      <div>{`${firstName} ${lastName}`}</div>
       <div className="text-xs uppercase text-yellow-200 opacity-60">{username}</div>
      <div className="text-xs uppercase font-semibold opacity-60">{skills.join(',')}</div>
    </div>
    <button className="btn btn-default">
      Profile
    </button>
    <button className="btn btn-default">
      Chat
    </button>
  </li>
  )
}

export default ConnectionItem