import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SignupBtn() {
  return (
        <NavLink to={'/register'}>
            <p className='md:px-1 md:py-[0.175rem] md:font-semibold md:text-base capitalize rounded-md font-bold bg-[#2ed853c7] border border-[#2ed853] hover:bg-[#2ed85377] px-4 py-2 transition duration-200'>Signup</p>
        </NavLink>
  )
}