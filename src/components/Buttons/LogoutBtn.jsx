import React from 'react';
import { NavLink } from 'react-router-dom';
import {BsFillGearFill} from 'react-icons/bs';

export default function LogoutBtn({handleLogout,username}) {
  return (
    <NavLink to={'/'}>
        <div className='md:px-2 md:py-1 md:font-semibold md:text-base sm:bg-transparent capitalize rounded-md font-bold bg-[#2ed853c7] border border-[#2ed853] hover:bg-[#2ed85377] px-4 py-2 transition duration-200 flex items-center gap-2' onClick={handleLogout}>
            <BsFillGearFill className='sm:hidden'/>
            <span>Logout</span> 
          <span className='sm:hidden font-extrabold text-[#471212d5]'>({username})</span>
        </div>
    </NavLink>
  )
}
