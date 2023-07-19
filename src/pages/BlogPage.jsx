import React, { useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/ContextProvider';
import {FaEdit} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import { formatISO9075 } from 'date-fns';
import { toast } from 'react-hot-toast';
import Spinner from '../components/Spinner';

export default function BlogPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const {userInfo,loading,setLoading} = useContext(UserContext);
  if(!location?.state?.blogId){
    return <div></div>
  }
  const {title,imageUrl,bloggerName,bloggerId,createdAt,content,blogId,summary} = location.state;

  async function handleDeleteBlog() {
    try {
        if(!window.confirm('Do You Wish To Delete Blog')){
            return;
        }
        setLoading(true);
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/blog/delete-blog/${blogId}`,{
            method: "DELETE",
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const response = await res.json();
        setLoading(false);
        if(response.success){
            toast.success(response.message);
            navigate('/');
        }
    } catch(err) {
        console.log('Error in Deleting Blog');
        console.error(err.message);
    }
  }

  return (
    <>
        {
            loading ?<Spinner/>: 
        <div className='flex flex-col gap-6 mt-4 text-center font-bold'>
        <p className='lg:text-3xl md:px-10 md:text-xl sm:text-base sm:px-4 text-4xl capitalize'>{title}</p>
        <div className='md:flex-col md:gap-2 sm:text-lg xs:text-base flex w-full px-7 py-1 justify-between text-xl font-semibold'>
            <span className='text-[#ffffffd3] capitalize'>Created By: {bloggerName}</span>
            <span className='text-[#ffffff6b] italic'>Created On: {formatISO9075(new Date(createdAt))}</span>
        </div>
        {
            (userInfo && userInfo.id === bloggerId) && 
            <div className='flex justify-around'>
                <NavLink to={`/edit/${blogId}`} state={{title,summary,content,blogId}}>
                    <div className='md:px-2 md:py-1 bg-[#90a51cc7] border border-[#b9d82e] hover:bg-[#c7d82e77] px-4 py-2 rounded-lg text-lg flex gap-3 items-center'><FaEdit/>Edit Blog</div>
                </NavLink>  
            </div>
        }
        <div className='flex h-[10rem]justify-center w-[55%] mx-auto rounded-lg'>
            <img src={imageUrl} alt='blog cover' className='h-full w-full object-cover rounded-lg' />
        </div>
        <div className='p-6'>
            <div className='md:text-center text-xl text-left text-[yellow]'>Summary</div>
            <p className='md:text-center sm:text-base text-[#ffffff8c] italic text-left mt-2 text-xl font-medium mb-7'>{summary}</p>
            <div className='md:text-center text-xl text-left text-[yellow]'>Read</div>
            <p dangerouslySetInnerHTML={{__html:content}} className='md:text-center sm:text-base text-left mt-2 text-xl font-medium'/>
        </div>

        {
            (userInfo && userInfo.id === bloggerId) && <div className='w-[50%] mx-auto mb-4'>
            <div className='md:py-1 sm:text-base bg-[#aa1818c7] border border-[#d82e2e] hover:bg-[#d82e2e77] px-4 py-2 rounded-lg text-lg flex gap-3 justify-center items-center cursor-pointer' onClick={handleDeleteBlog}><MdDelete/>Delete Blog</div>
        </div>
        }
        
        </div>
        }
    </>
  )
}
