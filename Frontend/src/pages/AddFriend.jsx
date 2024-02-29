import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from '../components/Button';
import Search from '../components/Search';
import Letter from '../components/Letter';
import { useNavigate } from 'react-router-dom';


const AddFriend = () => {
   const navigate = useNavigate()
   const [Fname,setFname] = useState('')
   const [Lname,setLname] = useState("")
   const [users, setUsers] = useState([]);
   const [reciverId,setReciverId] = useState('')
   const [filter,setFilter] = useState('') 
  
   useEffect(()=>{
     axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
     .then(response => {
        setUsers(response.data.user)
     }) 
     
   },[filter])

   const getUser = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/user/SignedinUser",{
      headers:{
        Authorization: "Bearer " + localStorage.getItem("token")
      } 
  })
  setFname(response.data.user_details.Firstname)
  setLname(response.data.user_details.Lastname)
}
  useEffect(()=>{
    getUser()
  },[])

  return (

    <div className='py-8 px-4'>
        
        <div className='w-full px-5'>
          <h1 className='font-bold text-2xl'>USERS ON THIS APP</h1>
          <input className='w-full px-2 py-1 mt-3 rounded-md border-2 border-gray-400 outline-none' type="text" placeholder='Search user...' />
         </div>
        {users.filter((user) => user.Firstname !== Fname && user.Lastname !== Lname).map((user)=>{
            return(
            <>
            <div className='w-full px-5 mt-5 justify-between flex'>
            <div className='flex gap-3 items-center font-medium text-lg'>
                    <Letter letter={user.Firstname[0].toUpperCase()}></Letter>
                    <h4 className=''>{user.Firstname} {user.Lastname}</h4>
                </div>
                <Button onPress={()=>{
                     axios.post('http://localhost:3000/api/v1/user/addfriend',{
                         reciever_Id: user._id
                     },{
                       headers:{
                         Authorization: "Bearer " + localStorage.getItem("token")
                       }
                     })
                }} buttontext={"Add Friend"} />
            </div>
            
            </>
       ) })}
       <button onClick={()=>{
            navigate('/dashboard')
        }} className='mt-6 px-6 underline'>Go back</button>
    </div>
  )
}

export default AddFriend
