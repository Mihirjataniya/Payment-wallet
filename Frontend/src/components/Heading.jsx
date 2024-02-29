import React from 'react'

const Heading = ({title,para}) => {
  return (
    <div className='w-full '>
            <h1 className='text-4xl font-bold text-center'>{title}</h1>
            <p className='text-center mt-2 text-[#676E7C]'>{para}</p>
    </div>
  )
}

export default Heading
