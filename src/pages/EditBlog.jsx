import React, { useContext, useEffect } from 'react';
import {useForm} from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import BackBtn from '../components/Buttons/BackBtn';
import { UserContext } from '../context/ContextProvider';
import Spinner from '../components/Spinner';

export default function EditBlog() {

  const {register, handleSubmit, setValue, watch} = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const {title,summary,content,blogId} = location.state;
  const {loading,setLoading} = useContext(UserContext);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  useEffect(() => {
    register('content');
      setValue('title',title);
      setValue('summary',summary);
      setValue('content',content);
    if(sessionStorage.getItem('formValuesEdit')) {
      setValue('title',JSON.parse(sessionStorage.getItem('formValuesEdit'))?.title);
      setValue('summary',JSON.parse(sessionStorage.getItem('formValuesEdit'))?.summary);
      setValue('image',JSON.parse(sessionStorage.getItem('formValuesEdit'))?.image);
      setValue('content',JSON.parse(sessionStorage.getItem('formValuesEdit'))?.content);
    }
  },[register]);

  const changeContent = (val) => {
    setValue('content',val);
  }

  const contentVal = watch('content');

  async function handleEditBlog(data) {
    if(sessionStorage.getItem('formValuesEdit')) {
      sessionStorage.removeItem('formValuesEdit');
    }
    const formData = new FormData();
    if(data.title)
      formData.append('title',data.title);
    if(data.summary)
      formData.append('summary',data.summary);
      formData.append('image',data?.image?.[0]);
      formData.append('blogId',blogId);
    if(data.content) {
        formData.append('content',data.content);
    }
    
    try {
        setLoading(true);
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/blog/edit-blog`,{
          method:'PUT',
          headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        });
    
        const response = await res.json();
        setLoading(false);
        if(response.success) {
          toast.success('Blog Updated Successfully');
          navigate('/',{state:response.data});
        }
        else {
          toast.error(response.message);
        }
    } catch(err) {
      console.log('Error in editing blog');
      console.error(err.message);
    }
  }
  
  function getFormValues() {
    return JSON.stringify({
      title:watch('title'),
      summary:watch('summary'),
      content:watch('content')
    });
  }
  

  return (
    <div>
        {
          loading ?<Spinner/>: 
          <>
            <div className='md:pr-1 inline-block cursor-pointer relative w-full'>
            <BackBtn formType={'Edit'} getFormValues = {getFormValues} />
            </div>
            <form onSubmit={handleSubmit(handleEditBlog)} className='md:gap-16 flex flex-col gap-7 p-2'>
                <div className='md:flex-col md:items-start md:gap-2 md:px-4 w-full flex gap-24 h-10 items-center'>
                    <label htmlFor='title' className='md:w-[24%] w-[17%] text-xl'>Title: </label>
                      <input className='md:w-[90%] w-[70%] focus:outline-none focus:border-2 focus:border-[#08292b] rounded-lg p-1 px-4 text-[#000] text-xl font-bold capitalize' type='text' id='title' {...register('title',{
                          maxLength:{
                            value:150
                          }
                      })} 
                        autoComplete='off'
                        spellCheck='false'
                        autoFocus
                      placeholder='Blog Title (Max 150 Chars)'/>
                </div>

                <div className='md:flex-col md:items-start md:gap-2 md:px-4 w-full flex gap-24 h-10 items-center'>
                      <label htmlFor='summary' className='md:w-[24%] w-[17%] text-xl'>Summary:</label>
                      <input className='md:w-[90%] w-[70%] focus:outline-none focus:border-2 focus:border-[#08292b] rounded-lg p-1 px-4 text-[#000] text-xl' type='text' id='summary' {...register('summary',{
                        maxLength:{
                          value:350
                        }
                      })} 
                      autoComplete='off'
                      spellCheck='false'
                      placeholder='Blog Summary (Max 350 Chars)'/>
                </div>

                <div className='md:px-4 md:gap-7 w-full flex gap-24 h-10 items-center'>
                      <label htmlFor='file' className='md:w-[24%] w-[17%] text-xl'>Cover:</label>
                      <input className='text-xl text-[#2ed853] font-bold' type='file' id='file' {...register('image')} />
                </div>

                <div className='md:px-4 h-72'>
                      <div className='md:w-[24%] w-[17%] text-xl mb-4'>Description:</div>
                      <ReactQuill onChange={changeContent} value={contentVal} className='max-h-[17rem] h-[85%] text-xl' modules={modules}/>
                </div>

                <button className='md:w-[50%] sm:mt-16 xs:mt-20 mt-9 capitalize rounded-lg font-bold bg-[#148f2eea] border border-[#2ed853] hover:bg-[#2ed85377] p-2 w-[25%] mx-auto transition duration-200 text-xl text-[#fff]'>Edit Blog</button>
            </form>
          </>
        }
    </div>
  )
}

