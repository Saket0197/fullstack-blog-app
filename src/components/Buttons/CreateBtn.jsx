import React from 'react';
import { NavLink } from 'react-router-dom';
import {FaEdit} from 'react-icons/fa';

export default function CreateBtn({userid}) {
  return (
    <NavLink to={`/create/${userid}`}>
      <p className='md:px-1 md:py-[0.175rem] md:font-semibold md:text-base flex gap-1 items-center capitalize rounded-md font-bold bg-[#2ed853c7] border border-[#2ed853] hover:bg-[#2ed85377] px-4 py-2 transition duration-200'>Create <FaEdit className='xs:hidden' /></p>
    </NavLink>
  )
}