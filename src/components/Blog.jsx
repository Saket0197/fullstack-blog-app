import { formatISO9075 } from 'date-fns';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {FaEdit} from 'react-icons/fa';
import { UserContext } from '../context/ContextProvider';

export default function Blog({blogId,title,summary,content,imageUrl,bloggerName,bloggerId,createdAt}) {

  const{userInfo} = useContext(UserContext);

  return (
    <div className='lg:flex-col md:flex-col md:mx-4 md:min-h-[37rem] md:h-fit md:justify-between md:gap-4 flex justify-between min-h-[20rem] mt-2 mb-10 gap-6 rounded-lg border bg-[#1a4918d0] border-[#ffffff3a] shadow-[0_0_4px_white] hover:scale-[1.02] transition duration-200'>
         <div className='lg:w-[100%] md:w-[100%] w-[40%] rounded-tl-lg rounded-bl-lg'>
          <img src= {imageUrl} alt='blog cover' className='lg:max-h-[24rem] md:rounded-tr-lg md:rounded-bl-none md:max-h-[22rem] md:object-fill rounded-tl-lg rounded-bl-lg h-full w-full object-cover object-center' />
        </div>

        <div className='lg:w-full w-[55%] gap-4 text-lg text-left p-2 flex flex-col items-start justify-between'>
          <NavLink to={`/blog/${blogId}`} state={{blogId,title,imageUrl,bloggerName,bloggerId,createdAt,content,summary}}>
            <p className='md:text-2xl sm:text-xl text-2xl font-bold mb-2 underline cursor-pointer capitalize p-2 rounded-xl bg-[#ffffff0c]'>
            {
              title.length > 80 ? `${title.substring(0,80)}...` : title
            }
            </p>

          </NavLink>
            <p className='text-[#ffffffd3] font-semibold capitalize flex items-center gap-2'>By: {bloggerName}
              <span className='text-[#fffc4a] font-extrabold text-2xl'>
                {
                  userInfo?.id === bloggerId && <FaEdit/>
                }
              </span>
            </p>

            <p className='text-[#ffffff6b] italic font-semibold'>Created on: {formatISO9075(new Date(createdAt))}</p>
            <p className=''>
            {
              summary.length > 150 ? `${summary.substring(0,150)}...` : summary
            }
          </p>
        </div>
    </div>
  )
}
