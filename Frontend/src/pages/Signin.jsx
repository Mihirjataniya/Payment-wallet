import {React,useEffect,useState} from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button'
import Bottom from '../components/Bottom'
import Heading from '../components/Heading'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Signin = () => {
  const [Email,setEmail] = useState('')
  const [Password,setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/dashboard')
    }
  },[navigate])
  
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
    <div className='bg-white w-[340px] p-4 rounded-lg  border-2'  style={{  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.25)'}}>
        <Heading title={"Sign In"} para={"Enter your information to log in your account"} />
        <InputField onChange={(e)=>{
            setEmail(e.target.value)
        }} fieldname={"Email"} placeholder={"jhonedoe@gmail.com"} />
        <InputField type={'password'} onChange={(e) => {
              setPassword(e.target.value)
            }} fieldname={"Password"} placeholder={""} />
        <Button onPress={async ()=>{
          const response =await axios.post("http://localhost:3000/api/v1/user/signin",{
            Email,
            Password
          })
          localStorage.setItem("token",response.data.token)
          navigate('/dashboard?id='+response.data.user_Id+"&Firstname="+response.data.Firstname+"&Lastname="+response.data.Lastname)
        }} buttontext={"Sign In"} />
        <Bottom text={"Don't have an account? "} link={"SignUp"} to={'/signup'} />
    </div>
  </div> 
  )
}

export default Signin
