import React from 'react'
import { Link } from 'react-router-dom'

const AllySuggestions = () => {
  return (
    <div className='w-full  p-6 bg-gradient-to-b from-[#406882] to-[#1A374D]'>
      
     <div className='max-w-4xl mx-auto'>
         {/* Header */}
      <div className='mb-6'>
        <h1 className='text-3xl font-semibold text-white'>Welcome back, Chandu 👋</h1>
        <p className='text-gray-400 text-sm mt-1'>
          Here are tasks available for you today.
        </p>
      </div>

      {/* Task Cards */}
      <div className='flex flex-col gap-4'>
        
        {/* Card 1 */}
        <div className='flex justify-between bg-white/10 border border-white/10 p-4 rounded-xl shadow-sm hover:bg-white/20 transition'>
          {/* Left */}
          <div>
            <p className='text-lg font-medium text-white'>Deliver groceries</p>
            <p className='text-gray-400 text-sm'>Downtown</p>
          </div>
          {/* Right */}
          <div className='text-right'>
            <p className='text-lg font-semibold text-white'>$15</p>
            <p className='text-gray-400 text-sm'>30 mins</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className='flex justify-between bg-white/10 border border-white/10 p-4 rounded-xl shadow-sm hover:bg-white/20 transition'>
          <div>
            <p className='text-lg font-medium text-white'>Data entry</p>
            <p className='text-gray-400 text-sm'>Online</p>
          </div>
          <div className='text-right'>
            <p className='text-lg font-semibold text-white'>$10</p>
            <p className='text-gray-400 text-sm'>2 hours</p>
          </div>
        </div>

      </div>

      {/* Button */}
      <div className='mt-8 text-center'>
        <Link to="/job/listings" className='bg-white cursor-pointer text-black font-medium px-6 py-2 rounded-full shadow hover:bg-gray-200 transition'>
          View More
        </Link>
      </div>
     </div>

    </div>
  )
}

export default AllySuggestions
