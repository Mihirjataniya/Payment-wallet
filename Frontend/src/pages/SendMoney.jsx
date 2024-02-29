import React, { useState } from 'react'
import Heading from '../components/Heading'  
import Letter from '../components/Letter'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
const SendMoney = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")
  const name = searchParams.get("Firstname")+ " " + searchParams.get("Lastname")
  const [amount,setAmount] = useState(0)
  return (
    <div className='flex justify-center items-center w-full h-screen'>
        <div className='bg-white w-[340px] p-4 rounded-lg border-2'  style={{  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.25)'}}>
          <Heading title={"Send Money"}></Heading>
          <div className='flex items-center w-full gap-2 mt-4'>
          <Letter letter={name[0].toUpperCase()} />
          <h1 className='text-lg font-medium'>{name}</h1>
          </div>
          <InputField onChange={(e)=>{
            setAmount(e.target.value)
          }} fieldname={'Amount (Rs.)' } placeholder={'Enter Amount'}></InputField>
          <Button onPress={()=>{
            axios.post('http://localhost:3000/api/v1/account/transfer',{
              touserId: id,
              amount
            },{
              headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            })
          }} buttontext={'Initiate Transfer'}></Button>
        </div>
      </div>
  )
}

export default SendMoney
