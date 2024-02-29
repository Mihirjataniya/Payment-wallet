import React from 'react'

const InputField = ({fieldname,placeholder,onChange,type}) => {
  return (
    <div className='my-3.5 w-full '>
            <label className='text-left mt-2 text-sm font-medium' htmlFor="">{fieldname}</label>
            <input type={type} onChange={onChange} className='w-full border-2 border-gray-300 mt-2 p-1.5 text-sm rounded-md outline-none' placeholder={placeholder} />
    </div>
  )
}

export default InputField
