import { useState } from "react"
import { SERVER } from "../utils/constant"
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { saveProfile } from "../utils/userProfileSlice";

const Login = () => {
  const [Email,setEmail]=useState('');
  const [Password,setPassword]=useState('');
  const [errorMessage,setErrorMessage]=useState('');
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const profile=useSelector((store)=>store.profile.data);
  if(profile){
    navigate('/feed');
  }

  const handleClick=async()=>{
     try{
       const options={
        method:'POST',
        credentials: 'include', //This is required for cookies
        headers: {
        'Content-Type': 'application/json' // Required for backend to parse JSON
        },
        body:JSON.stringify({email:Email,password:Password})
       }
       const response=await fetch(SERVER+'/login',options)
       const json=await response.json();
       
       if(!response.ok){
          throw new Error(json.message || 'login failed');
       }
       
       setErrorMessage('');
       console.log(json.data);
       dispatch(saveProfile(json.data));
       navigate('/feed');
     }catch(err){
        setErrorMessage(err?.message||'something went wrong');
     }
  }

  return (
    <div className="card card-border border-2 bg-base-300 w-96 mx-auto mt-32">
    <div className="card-body flex flex-col justify-center items-center gap-6">
    <h2 className="card-title">Login</h2>
    <div className='textInputs flex flex-col w-full gap-4'>
        <input type="text" value={Email} placeholder="Enter your email" className="input" onChange={(e)=>setEmail(e.target.value)} />
        <input type="text" value={Password} placeholder="Password" className="input" onChange={(e)=>setPassword(e.target.value)} />
    </div>
    <p className="text-red-500">{errorMessage}</p>
    <p>New to tindev? <span className="cursor-pointer hover:text-zinc-500" onClick={()=>navigate('/signup')}>Signup</span></p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={handleClick}>Login</button>
    </div>
  </div>
</div>
  )
}

export default Login