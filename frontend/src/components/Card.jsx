import React from 'react'

function Card({ title, description, icon, action }) {

    return (
        <div className={'bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition'} >
            {icon && (
                <div className='mb-4'>
                    {icon}
                </div>
            )}
            {title && (
                <h3 className='text-lg text-black font-semibold mb-2' >
                    {title}
                </h3>
            )}
            {description && (
                <p className='text-gray-600 mb-4'>
                    {description}
                </p>
            )}
            {action && (
                <div>
                    {action}
                </div>
            )}
        </div>
    )
}

export default Card