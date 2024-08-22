import React from 'react';

const CustomButton = ({ title, onClick }) => {
  return (
    <button
      className={`bg-[#2BD17E] py-3 px-12 rounded-lg w-full block focus:outline-none text-white hover:bg-green-500 focus:ring-4 focus:ring-green-500 ring-offset-1 font-medium text-sm `}
      // {...props}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
