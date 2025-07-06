import { useState } from "react"
import { SERVER } from "../utils/constant"
import { useNavigate } from "react-router";

const Signup = () => {
  const navigate=useNavigate();
  const [firstNameData,setFirstNameData]=useState(null)
  const [lastNameData, setLastNameData] = useState(null);
  const [genderData, setGenderData] = useState(null);
  const [ageData, setAgeData] = useState(null);
  const [emailData, setEmailData] = useState(null);
  const [passwordData, setPasswordData] = useState(null);
  const [usernameData, setUsernameData] = useState(null);
  const [errorMessage,setErrorMessage]=useState(null)

  const handleClick=async()=>{
      const response=await fetch(SERVER+'/signup',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify({
            firstName: firstNameData,
            lastName: lastNameData,
            gender: genderData,
            age: ageData,
            password:passwordData,
            email:emailData,
            username:usernameData
          })
    })
      
      if(response.ok){
          const json=await response.json();
         alert(json.message);
          navigate('/login')
      }else{
        const json=await response.json();
        setErrorMessage(json.message)
      }
      
  }
  
  return (
  <div className='info flex flex-col items-center md:gap-2 border-2 w-1/2 mx-auto mt-10 bg-base-200 p-6'>
    <h1 className="text-2xl text-center">Register Below!</h1>
  <div className='flex gap-5 justify-center w-full items-center'>
    <p className='md:w-20 w-32'>Firstname</p>
    <input
      type="text"
      placeholder="Type here"
      className={`input`}
      value={firstNameData}
      onChange={(e) => setFirstNameData(e.target.value)}
    />
  </div>

  <div className='flex gap-5 justify-center w-full items-center relative'>
    <p className='md:w-20 w-32'>Lastname</p>
    <input
      type="text"
      placeholder="Type here"
      className={`input`}
      value={lastNameData}
      onChange={(e) => setLastNameData(e.target.value)}
    />
  </div>

  <div className='flex gap-5 justify-center w-full items-center'>
    <p className='md:w-20 w-32'>Email</p>
    <input
      type="text"
      placeholder="Type here"
      className={`input`}
      value={emailData}
      onChange={(e) => setEmailData(e.target.value)}
    />
  </div>

  <div className='flex gap-5 justify-center w-full items-center'>
    <p className='md:w-20 w-32'>Password</p>
    <input
      type="text"
      placeholder="Type here"
      className={`input`}
      value={passwordData}
      onChange={(e) => setPasswordData(e.target.value)}
    />
  </div>

  <div className='flex gap-5 justify-center w-full items-center'>
    <p className='md:w-20 w-32'>Username</p>
    <input
      type="text"
      placeholder="Type here"
      className={`input`}
      value={usernameData}
      onChange={(e) => setUsernameData(e.target.value)}
    />
  </div>

  <div className='flex gap-5 justify-center w-full items-center'>
    <p className='md:w-20 w-32'>Age</p>
    <input
      type="text"
      placeholder="Type here"
      className={`input`}
      value={ageData}
      onChange={(e) => setAgeData(e.target.value)}
    />
  </div>

  <div className='flex gap-5 justify-center w-full items-center'>
    <p className='md:w-20 w-32'>Gender</p>
    <input
      type="text"
      placeholder="Type here"
      className={`input`}
      value={genderData}
      onChange={(e) => setGenderData(e.target.value)}
    />
  </div>

        <p className="text-red-500">{errorMessage}</p>
        <p className="">Already a User? <span className="cursor-pointer hover:text-zinc-600" onClick={()=>navigate('/login')}>Login</span></p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={handleClick}>Signup</button>
    </div>

      </div>
  )
}

export default Signup;
