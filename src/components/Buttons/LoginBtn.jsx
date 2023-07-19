import React from 'react';
import { NavLink } from 'react-router-dom';

export default function LoginBtn() {
  return (
        <NavLink to={'/login'}>
            <p className='md:px-2 md:py-1 md:font-semibold md:text-base capitalize rounded-md font-bold border border-[#2ed853] hover:bg-[#2ed85377] px-4 py-2 transition duration-200'>Login</p>
        </NavLink>
  )
}
