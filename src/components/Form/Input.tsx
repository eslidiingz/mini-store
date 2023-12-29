import React from 'react'

const Input = ({ className, inValid, size, ...props}: any) => {

  let inValidClass = 'ring-gray-300'
  let focusRingInvalidClass = 'focus:ring-[var(--primary-color)]'

  if ( inValid ) {
    inValidClass = 'ring-red-400'
    focusRingInvalidClass = 'focus:ring-red-400'
  }

  let paddingClass = ""
  switch (size) {
    case 'sm':
      paddingClass = "px-2 py-1.5"
      break;
  
    default:
      paddingClass = "px-4 py-2.5"
      break;
  }
  
  return (
    <input 
      {...props} 
      className={`${className ? className : '' } 
      block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
      placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
      ${focusRingInvalidClass} 
      ${paddingClass} 
      ${inValidClass}
      ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
      sm:text-sm sm:leading-6 outline-none `}
    />
  )
}

export default Input
