import {React, useEffect} from 'react'
import Button from './Button'
import Letter from './Letter'
import Search from '../components/Search'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useSearchParams } from 'react-router-dom'

const User = ({ letter,username }) => {
   const [searchParams] = useSearchParams()
   const navigate = useNavigate()
   const [users, setUsers] = useState([]);
   const [filter,setFilter] = useState('') 
   const Fname = searchParams.get("Firstname")
   const Lname = searchParams.get("Lastname")
   useEffect(()=>{
     axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
     .then(response => {
        setUsers(response.data.user)
     }) 
     
   },[filter])

    return (
        <>
        <Search onChange={(e)=>{
            setFilter(e.target.value)
        }}/>
        {users.filter((user) => user.Firstname !== Fname && user.Lastname !== Lname).map((user)=>{
            return(
            <>
            <div className='w-full px-5 mt-5 justify-between flex'>
            <div className='flex gap-3 items-center font-medium text-lg'>
                    <Letter letter={user.Firstname[0].toUpperCase()}></Letter>
                    <h4 className=''>{user.Firstname} {user.Lastname}</h4>
                </div>
                <Button onPress={()=>{
                    navigate('/send?id='+user._id+"&Firstname="+user.Firstname+"&Lastname="+user.Lastname)
                }} buttontext={"Send Money"} />
            </div>
            </>
       ) })}
       
        </>
    )
}

export default User
