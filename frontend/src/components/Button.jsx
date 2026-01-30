import React from 'react'

function Button({onButtonClick,buttonText,icon, buttonVariant = 'primary'}) {
    const buttonStyles = {
        primary:
            'bg-green-600 text-white hover:bg-green-700'
    }
  return (
    <div>
    {buttonText && (
        <button
            onClick={onButtonClick}
            className={`mt-4 inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition ${buttonStyles[buttonVariant]}`}
        >
            {buttonText}
            {icon}
        </button>
    )}
    </div>
  )
}

export default Button