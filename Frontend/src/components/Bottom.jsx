import React from 'react'
import { Link } from 'react-router-dom'
const Bottom = ({text,link,to}) => {
  return (
    <p className='text-center mt-2 text-sm font-medium'>{text} <Link className="pointer underline pl-1 cursor-pointer" to={to}>
    {link}
  </Link> </p>
  )
}

export default Bottom
