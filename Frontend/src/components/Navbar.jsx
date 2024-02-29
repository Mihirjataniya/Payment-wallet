import React, { useEffect, useState } from 'react'
import Letter from './Letter'
import axios from 'axios'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  const [Fname,setFname] = useState("")
  const [Lname,setLname] = useState("")
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

  const addmoney = () => {
    navigate('/addmoney')
  }

  return (
    <div className='flex justify-between w-full items-center p-5 border-b-2 '>
      <div className='flex gap-8'>
      <h1 className='text-2xl font-bold'>Payments wallet</h1>
            <div className='flex gap-2'>
              <Button onPress={addmoney} buttontext={"Add Money"} />
              <Button buttontext={"Add Friends"} />
              <Button buttontext={"Logout"} />
            </div>
      </div>
            
            <div className='flex gap-3 items-center font-medium text-lg'>
              <h4 className=''>Hello, {Fname} {Lname}</h4>
              <Letter letter={Fname && Fname[0].toUpperCase()} />
            </div>
    </div>
  )
}

export default Navbar
