import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {FaEye,FaEyeSlash} from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {

  const {register, handleSubmit, formState:{errors}} = useForm();
  const navigate = useNavigate();
  const [isVisible,setVisible] = useState(false);

  async function handleRegister(formData) {
  
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/signup`,{
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body:JSON.stringify(formData)
    });
    const response = await res.json();

    if(response.success) {
      toast.success(`${response.message}`);
      navigate('/');
    }
    else{
      toast.error(`${response.message}`);
    }
    } catch(err) {
      console.log('Error in Signup');
      console.error(err.message);
    }
    
  }

  return (
    <div className='md:mt-28 flex flex-col gap-9 items-center mt-7 rounded-lg py-7'>
      <h1 className='text-center text-2xl font-bold uppercase'>Signup</h1>
      <form onSubmit={handleSubmit(handleRegister)} className='flex flex-col w-full gap-4 p-4 text-lg'>
          
          <div className='md:flex-col md:gap-5 flex gap-10 p-1'>
              <label htmlFor='username' className='font-semibold w-[15%]'><sup className='text-red-700 text-lg font-bold'>*</sup>Username: </label>
              <div className= 'md:w-[100%] w-[70%]'>
                  <input 
                  type='text' 
                  id='username'
                  {...register('username',{
                      required:{
                        value: true,
                        message: "Username cannot be empty"
                      },
                      minLength:{
                        value: 5,
                        message: "Name length cannot be less than 5"
                      },
                      maxLength:{
                        value: 20,
                        message: "Name length should not exceed 20"
                      }
                  })}
                  className={`border border-[#413f3f] rounded-md w-full h-10 px-4 text-[#141414] focus:outline-none focus:border-2 focus:border-[#08292b] ${Object.keys(errors).includes('username') && "focus:border-[red]"}`}
                  autoComplete='off'
                  spellCheck='false'
                  autoFocus
                  noValidate
                  placeholder='Your Username'/>
                  <p className='mt-1 text-[#ff3232] font-bold italic'>{Object.keys(errors).includes('username') && `*${errors.username?.message}`}</p>
              </div>
          </div>

          <div className='md:flex-col md:gap-5 flex gap-10 p-1'>
              <label htmlFor='email' className='font-semibold w-[15%]'><sup className='text-red-700 text-lg font-bold'>*</sup>Email: </label>
              <div className= 'md:w-[100%] w-[70%]'>
                  <input 
                  type='email' 
                  id='email'
                  {...register('email',{
                      required:{
                        value: true,
                        message: "Email cannot be empty"
                      },
                      pattern:{
                        value: /^[^.-][a-zA-Z0-9-.]*@[a-zA-Z]+[.][a-zA-Z]+$/,
                        message: "Invalid Email Format"
                      }
                  })}
                  className={`border border-[#413f3f] rounded-md w-full h-10 px-4 text-[#141414] focus:outline-none focus:border-2 focus:border-[#08292b] ${Object.keys(errors).includes('email') && "focus:border-[red]"}`}
                  autoComplete='off'
                  spellCheck='false'
                  noValidate
                  placeholder='example.email@domain.com'/>
                  <p className='mt-1 text-[#ff3232] font-bold italic'>{Object.keys(errors).includes('email') && `*${errors.email?.message}`}</p>
              </div>
          </div>

          <div className='md:flex-col md:gap-5 flex gap-10 p-1'>
              <label htmlFor='password' className='font-semibold w-[15%]'><sup className='text-red-700 text-lg font-bold'>*</sup>Password: </label>
              <div className= 'md:w-[100%] w-[70%] relative'>
                  <input 
                  type={`${isVisible ? 'text' : 'password'}`} 
                  id='password'
                  {...register('password',{
                      required:{
                        value: true,
                        message: "Password cannot be empty"
                      },
                      pattern:{
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                        message: "Password must be between 8 to 20 characters long and must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character"
                      }
                  })}
                  className={`border border-[#413f3f] rounded-md w-full h-10 px-4 text-[#141414] focus:outline-none focus:border-2 focus:border-[#08292b] ${Object.keys(errors).includes('password') && "focus:border-[red]"}`}
                  autoComplete='off'
                  spellCheck='false'
                  noValidate
                  placeholder='Your Password'/>
                  <p className='mt-1 text-[#ff3232] font-bold italic'>{Object.keys(errors).includes('password') && `*${errors.password?.message}`}</p>
                {
                  !isVisible ? <FaEye onClick={() => setVisible(!isVisible)} className='text-[#000] text-xl absolute right-3 top-3 cursor-pointer' /> : <FaEyeSlash onClick={() => setVisible(!isVisible)} className='text-[#000] text-xl absolute right-3 top-3 cursor-pointer' />
                }
              </div>
          </div>

          <button className='md:w-[40%] capitalize rounded-lg font-bold bg-[#2ed853c7] border border-[#2ed853] hover:bg-[#2ed85377] p-2 w-[20%] mx-auto transition duration-200 text-[#fff]'>Signup</button>
      </form>
    </div>
  )
}
