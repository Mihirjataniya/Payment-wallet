import React from 'react'
import Navbar from '../components/Navbar'
import Balance from '../components/Balance'
import User from '../components/User'

const Dashboard = () => {

  return (
    <div className='w-full h-screen '>
    <Navbar />
    <Balance />
    <User />
  </div>
  )
}

export default Dashboard
