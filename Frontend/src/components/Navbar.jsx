import React from 'react'
import Letter from './Letter'
import { useSearchParams } from 'react-router-dom'
const Navbar = () => {
  const [searchParams] = useSearchParams()
  const name = searchParams.get("Firstname")+ " " + searchParams.get("Lastname")
  return (
    <div className='flex justify-between w-full items-center p-5 border-b-2 '>
            <h1 className='text-2xl font-bold'>Payments wallet</h1>
            <div className='flex gap-3 items-center font-medium text-lg'>
              <h4 className=''>Hello, {name}</h4>
              <Letter letter={name[0].toUpperCase()} />
            </div>
    </div>
  )
}

export default Navbar
