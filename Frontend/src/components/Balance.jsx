import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Balance = () => {
  const [balance,setBalance] = useState(0)
  useEffect(()=>{
    axios.get('http://localhost:3000/api/v1/account/balance',{
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
  .then(response => {
    setBalance(response.data.balance)
  })
  },[])
  
  return (
    <div className='p-5 flex gap-3 items-center text-lg font-medium w-full'>
          <h1>Your Balance:</h1>
          <h2 className='font-bold '>Rs. {balance}</h2>
    </div>
  )
}

export default Balance
