import React, { useState } from 'react'
const CustomInput = ({ ...props }) => {

    return (
                    <input
                        required
                        {...props}
                        className='bg-[#224957] rounded-lg py-3 px-4 w-full block'
                    />
    )
}


export default CustomInput 