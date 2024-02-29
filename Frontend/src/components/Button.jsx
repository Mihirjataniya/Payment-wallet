import React from 'react'

const Button = ({buttontext,onPress}) => {
  return (
    <div>  
         <button onClick={onPress} className='bg-black text-white w-full text-sm font-medium p-2 rounded-md'>{buttontext}</button> 
    </div>
 
  )
}

export default Button
