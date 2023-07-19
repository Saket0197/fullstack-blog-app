import React, { useEffect, useState } from 'react';
import Blog from '../components/Blog';

export default function HomePage() {

  const [Blogs,setBlogs] = useState([]);

  useEffect(() => {
      async function getBlogs() {
        try{
          const res = await fetch(`${process.env.REACT_APP_BASE_URL}/blog/getBlogs`);
        const response = await res.json();
        if(response.success){
          setBlogs(response.data);
        }
        } catch(err) {
          console.log('Error in fetching all blogs');
          console.error(err.message);
        }
      }
      getBlogs();
  },[]);

  return (
    <div className='md:px-9 md2:px-2 sm:p-1 mx-auto p-1 mt-10'>
        {
          (Blogs.length > 0) ? Blogs.map((eachBlog) => {
            return <Blog key={eachBlog._id} blogId={eachBlog._id} title={eachBlog.title} summary={eachBlog.summary} imageUrl = {eachBlog.coverImage} bloggerName = {eachBlog.blogger.username} bloggerId = {eachBlog.blogger._id} createdAt={eachBlog.createdAt} content={eachBlog.content}/>
          }) : <div className='md:text-xl font-bold text-2xl text-[#fff] h-[70vh] flex justify-center items-center'>Add Blogs Here, Your Blogs will be public</div>
        }
    </div>
  )
}
