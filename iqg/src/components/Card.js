import React from 'react'

function Card({ title, description, icon, button }) {
  return (
    <div className={'bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition'} >
        {icon && (
            <div className='mb-4 text-blue-600'>
                {icon}
            </div>
        )}
        {title && (
            <h3 className='text-lg text-green-600 font-semibold mb-2' >
                {title}
            </h3>
        )}
        {description && (
            <p className='text-gray-600 mb-4'>
                {description}
            </p>
        )}
        
    </div>
  )
}

export default Card