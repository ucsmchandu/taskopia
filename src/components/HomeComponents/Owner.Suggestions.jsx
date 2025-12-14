import React from 'react'
import { Link } from 'react-router-dom'

// TODO : need to get the data from the db only for suggestions need to display like a add 
const OwnerSuggestions = () => {
  return (
    <div className=' bg-gradient-to-t from-[#092635] to-[#1B4242]  mt-20 p-6'>
      
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
      <div className='mb-6'>
        <h1 className='text-3xl font-semibold text-white'>Welcome back! 👋</h1>
        <p className='text-gray-400 text-sm mt-1'>
          Need help today? Here are your recent tasks.
        </p>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-4 mb-6'>
        <Link to="/post/job" className='bg-white/10 border cursor-pointer border-white/10 text-white px-5 py-2 rounded-xl hover:bg-white/20 transition'>
          Post a Task
        </Link>

        <Link to="/owner/dashboard" className='bg-white/10 border cursor-pointer border-white/10 text-white px-5 py-2 rounded-xl hover:bg-white/20 transition'>
          View Posted Tasks
        </Link>
      </div>

      {/* Recent Tasks */}
      <div className='flex flex-col gap-4'>
        
        {/* Task 1 */}
        <div className='flex justify-between bg-white/10 border border-white/10 p-4 rounded-xl shadow-sm hover:bg-white/20 transition'>
          <div>
            <p className='text-lg font-medium text-white'>College move-out assistance</p>
            <p className='text-gray-400 text-sm'>3 applicants</p>
          </div>
          <button className='text-blue-300 cursor-pointer w-fit h-fit text-sm hover:underline'>Manage</button>
        </div>

        {/* Task 2 */}
        <div className='flex justify-between bg-white/10 border border-white/10 p-4 rounded-xl shadow-sm hover:bg-white/20 transition'>
          <div>
            <p className='text-lg font-medium text-white'>Lawn mowing</p>
            <p className='text-gray-400 text-sm'>5 applicants</p>
          </div>
          <button className='text-blue-300 cursor-pointer w-fit h-fit text-sm hover:underline'>Manage</button>
        </div>

      </div>

      {/* Footer Button */}
      <div className='mt-8 text-center'>
        <Link to="/owner/dashboard" className='bg-white cursor-pointer text-black font-medium px-6 py-2 rounded-full shadow hover:bg-gray-200 transition'>
          View All My Tasks
        </Link>
      </div>
      </div>

    </div>
  )
}

export default OwnerSuggestions
