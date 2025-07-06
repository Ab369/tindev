import React, { useEffect, useState } from 'react'
import FeedCard from './FeedCard'
import { useDispatch, useSelector } from 'react-redux'
import store from '../utils/store'
import { SERVER } from '../utils/constant'
import ChangePassword from './ChangePassword'
import { saveProfile } from '../utils/userProfileSlice'

const Profile = () => {

  const profile=useSelector((store)=>store.profile.data);
  
  const {firstName,lastName,photo,gender,age,about,skills,password,email,username}=profile||{};

  const [firstNameData,setFirstNameData]=useState('')
  const [lastNameData, setLastNameData] = useState('');
  const [photoData, setPhotoData] = useState('');
  const [genderData, setGenderData] = useState('');
  const [ageData, setAgeData] = useState('');
  const [aboutData, setAboutData] = useState('');
  const [skillsData, setSkillsData] = useState('');
  const [emailData, setEmailData] = useState('');
  const [usernameData, setUsernameData] = useState('');

  useEffect(() => {
  if (profile) {
    setFirstNameData(profile.firstName || '');
    setLastNameData(profile.lastName || '');
    setPhotoData(profile.photo || '');
    setGenderData(profile.gender || '');
    setAgeData(profile.age || '');
    setAboutData(profile.about || '');
    setSkillsData(profile.skills || '');
    setEmailData(profile.email || '');
    setUsernameData(profile.username || '');
  }
}, [profile]);
  
  let feedData = {
  firstName: firstNameData,
  lastName: lastNameData,
  photo: photoData,
  gender: genderData,
  age: ageData,
  about: aboutData,
  skills: skillsData,
  email: emailData,
  username: usernameData
};

  const [showEditable,setShowEditable]=useState(false);
  const [toastStatus,setToastStatus]=useState(0);
  const [toastMessage,setToastMessage]=useState(null);
  const [showPassChange,setShowPassChange]=useState(false);
  
  const dispatch=useDispatch();

  const updateProfile=async()=>{
      const response=await fetch(SERVER+'/profile/edit',{
      method:'PATCH',
      headers:{
        'content-type':'application/json'
      },
      credentials:'include',
      body: JSON.stringify({
            firstName: firstNameData,
            lastName: lastNameData,
            photo: photoData,
            gender: genderData,
            age: ageData,
            about: aboutData,
            skills:(skillsData!='No skills added')?skillsData.split(','):'add skills followed by comma(,)',
          })
    })
      

       if(response.ok){
        const json=await response.json();
        dispatch(saveProfile(json.data))
        alert(json.message);
       }
       else{
        const json=await response.json();
        alert(json.message);
       }
      
      // setToastMessage(json.message);
      // response.ok?setToastMessage(1):setToastStatus(-1);
      // setTimeout(()=>{
      //   setToastStatus(0);
      //   setToastMessage(null);
      // },2000)

  }

  useEffect(()=>{

  },[profile])

  if(!profile)return(<>Loading...</>);

  
  return (
    <div className="hero bg-base-100 flex flex-col md:gap-12 md:py-10">
      <h1 className="text-3xl font-bold">Your Profile</h1>

  <div className={`flex flex-col md:grid grid-cols-3 ${(showPassChange?'blur-lg':'')}`}>
  <div className="hero-content flex-col w-full items-center md:col-span-2">
     <img
      src={profile.photo}
      className="w-20 rounded-lg shadow-2xl md:hidden"
    />
    
      <div className='info flex flex-col w-full items-center md:gap-2'>
  <div className='flex gap-5 justify-center w-full items-center'>
    <p className='md:w-20 w-32'>Firstname</p>
    <input
      type="text"
      placeholder="Type here"
      className={`input ${(showEditable?'input-warning':'input-ghost')}`}
      value={firstNameData}
      onChange={(e) => setFirstNameData(e.target.value)}
    />
  </div>

  <div className='flex gap-5 justify-center w-full items-center relative'>
    <p className='md:w-20 w-32'>Lastname</p>
    <input
      type="text"
      placeholder="Type here"
      className={`input ${(showEditable?'input-warning':'input-ghost')}`}
      value={lastNameData}
      onChange={(e) => setLastNameData(e.target.value)}
    />
  </div>

  <div className='flex gap-5 justify-center w-full items-center'>
    <p className='md:w-20 w-32'>Email</p>
    <input
      type="text"
      placeholder="Type here"
      className={`input ${(showEditable?'input-warning':'input-ghost')}`}
      disabled
      value={emailData}
      onChange={(e) => setEmailData(e.target.value)}
    />
  </div>

  <div className='flex gap-5 justify-center w-full items-center'>
    <p className='md:w-20 w-32'>Username</p>
    <input
      type="text"
      placeholder="Type here"
      className={`input ${(showEditable?'input-warning':'input-ghost')}`}
      disabled
      value={usernameData}
      onChange={(e) => setUsernameData(e.target.value)}
    />
  </div>

  <div className='flex gap-5 justify-center w-full items-center'>
    <p className='md:w-20 w-32'>Age</p>
    <input
      type="text"
      placeholder="Type here"
      className={`input ${(showEditable?'input-warning':'input-ghost')}`}
      value={ageData}
      onChange={(e) => setAgeData(e.target.value)}
    />
  </div>

  <div className='flex gap-5 justify-center w-full items-center'>
    <p className='md:w-20 w-32'>Gender</p>
    <input
      type="text"
      placeholder="Type here"
      className={`input ${(showEditable?'input-warning':'input-ghost')}`}
      value={genderData}
      onChange={(e) => setGenderData(e.target.value)}
    />
  </div>

  <div className='flex gap-5 justify-center w-full items-center'>
    <p className='md:w-20 w-32'>Photo URL</p>
    <input
      type="text"
      placeholder="Type here"
      className={`input ${(showEditable?'input-warning':'input-ghost')}`}
      value={photoData}
      onChange={(e) => setPhotoData(e.target.value)}
    />
  </div>

  <div className='flex gap-5 justify-center w-full items-center'>
    <p className='md:w-20 w-32'>Skills</p>
    <input
      type="text"
      placeholder="Type here"
      className={`input ${(showEditable?'input-warning':'input-ghost')}`}
      value={skillsData}
      onChange={(e) =>{
         setSkillsData(e.target.value)
      }}
    />
  </div>

  <div className='flex gap-5 justify-center w-full items-center'>
    <p className='md:w-20 w-32'>About</p>
    <textarea placeholder="Type here"
      className={`input ${(showEditable?'textarea-warning':'textarea-ghost')}`}
      value={aboutData}
      onChange={(e) => setAboutData(e.target.value)}>
   </textarea>
  </div>
</div>
       <div>
      <button className="btn btn-primary" onClick={()=>{
        if(!showEditable){
          setShowEditable((prev)=>!prev)
        }
        else{
          setShowEditable((prev)=>!prev)
          updateProfile();
        }
      }}>{`${showEditable?'Save Profile':'Edit Profile'}`}</button>
      <button className="btn" onClick={()=>{
        setShowPassChange(true);
        }}>Change Password</button>
      </div>
    </div>
    <div className='max-md:hidden'>
  <FeedCard feedData={feedData} isFeed={false}/>
  </div>
  </div>

  {/* alert toast */}
   {/* <div className={`toast toast-center toast-middle ${(toastStatus!=0?'':'hidden')}`}>
  <div className={`alert ${(toastStatus==1?'alert-success':'alert-error')}`}>
    <span>aaaaaaaaaa</span>
  </div></div> */}
  
  {/* password change */}
  <div className={`absolute ${(showPassChange)?'':'hidden'}`}>
    <ChangePassword setShowPassChange={setShowPassChange}/>
  </div>
</div>
  )
}

export default Profile