import React, { useState,useEffect } from 'react'
import Heading from '../components/Heading'  
import Letter from '../components/Letter'
import InputField from '../components/InputField'
import Button from '../components/Button'
import axios from 'axios'
const AddMoney = () => {
 
  const [amount,setAmount] = useState(0)
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

  const addAmount = async () => {
    console.log("clicd");
    axios.post('http://localhost:3000/api/v1/account/addmoney',{
      amount
    },{
      headers:{
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
  }

  return (
    <div className='flex justify-center items-center w-full h-screen'>
        <div className='bg-white w-[340px] p-4 rounded-lg border-2'  style={{  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.25)'}}>
          <Heading title={"Add Money"}></Heading>
          <div className='flex items-center w-full gap-2 mt-4'>
          <Letter letter={Fname && Fname[0].toUpperCase()} />
          <h1 className='text-lg font-medium'>{Fname} {Lname}</h1>
          </div>
          <InputField onChange={(e)=>{
            setAmount(e.target.value)
          }} fieldname={'Amount (Rs.)' } placeholder={'Enter Amount'}></InputField>
          <Button onPress={addAmount} buttontext={'Initiate Transfer'}></Button>
        </div>
      </div>
  )
}

export default AddMoney
