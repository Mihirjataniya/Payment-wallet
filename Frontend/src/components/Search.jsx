import React from 'react'

const Search = ({onChange}) => {
  return (
    <div className='w-full px-5'>
          <h1 className='font-bold text-xl'>Users</h1>
          <input onChange={onChange} className='w-full px-2 py-1 mt-3 rounded-md border-2 border-gray-400 outline-none' type="text" placeholder='Search user...' />
    </div>
  )
}

export default Search
