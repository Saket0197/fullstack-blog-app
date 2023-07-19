import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackBtn({formType,getFormValues}) {

  const navigate = useNavigate();
  const fv = getFormValues();
  function handleBack() {
    if(formType === 'Create') {
        sessionStorage.setItem('formValuesCreate',fv);
    }
    else if(formType === 'Edit') {
        sessionStorage.setItem('formValuesEdit',fv);
    }
    navigate(-1);
  }

  return (
        <p className='md:relative md:left-[100%] md:translate-x-[-100%] w-fit capitalize rounded-md font-bold bg-[#f0481e] border border-[#000000] hover:bg-[#f0481e85] px-4 py-2 transition duration-200' onClick={handleBack}>Back</p>
  )
}