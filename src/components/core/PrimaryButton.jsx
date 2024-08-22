import React from 'react'

const PrimaryButton = ({title, onClick }) => {
  return (
    <button
    onClick={onClick}
    type='button'
    className={`bg-transperant py-3 px-12 border-[#fff] border-[1px] rounded-lg w-full block focus:outline-none text-white focus:ring-4 focus:ring-green-500 ring-offset-1 font-medium text-sm `}
  >
    {title}
  </button>
  )
}

export default PrimaryButton