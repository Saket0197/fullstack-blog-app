import React, { useContext, useEffect } from 'react';
import {useForm} from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../components/Buttons/BackBtn';
import { UserContext } from '../context/ContextProvider';
import Spinner from '../components/Spinner';
import '../customstyles/fileButton.css';

export default function CreateBlog() {

  const {register, handleSubmit, setValue, watch, formState:{errors}} = useForm();
  const navigate = useNavigate();
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
    register('content',{required:{value:true}});
    if(sessionStorage.getItem('formValuesCreate')) {
      setValue('title',JSON.parse(sessionStorage.getItem('formValuesCreate'))?.title);
      setValue('summary',JSON.parse(sessionStorage.getItem('formValuesCreate'))?.summary);
      setValue('image',JSON.parse(sessionStorage.getItem('formValuesCreate'))?.image);
      setValue('content',JSON.parse(sessionStorage.getItem('formValuesCreate'))?.content);
    }
  },[register]);

  const changeContent = (val) => {
    setValue('content',val);
  }

  const contentVal = watch('content');

  async function handleCreateBlog(data) {
    if(sessionStorage.getItem('formValuesCreate')) {
      sessionStorage.removeItem('formValuesCreate');
    }
    const formData = new FormData();
    formData.append('title',data.title);
    formData.append('summary',data.summary);
    formData.append('image',data.image?.[0]);
    formData.append('content',data.content);
    
    try {
        setLoading(true);
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/blog/create`,{
          method:'POST',
          headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          body: formData
        });

        const response = await res.json();
        setLoading(false);
        if(response.success) {
          toast.success('Blog Created Successfully');
          navigate('/',{state:response.data});
        }
        else {
          toast.error(response.message);
        }
    } catch(err){
        console.log('Error in creating blog');
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
        {loading ?<Spinner/>: 
        <>
          <div className='md:pr-1 inline-block cursor-pointer relative w-full'>
            <BackBtn formType={'Create'} getFormValues = {getFormValues} />
          </div>
          <h1 className='my-5 text-center text-xl font-bold underline text-[yellow] select-none'>All Fields are Mandatory</h1>
          <form onSubmit={handleSubmit(handleCreateBlog)} className='md:gap-16 flex flex-col gap-7 p-2'>
              
              <div className='md:flex-col md:items-start md:gap-2 md:px-4 w-full flex gap-24 h-10 items-center'>
                  <label htmlFor='title' className='md:w-[24%] w-[17%] text-xl'><sup className='text-red-700 font-bold text-xl'>*</sup>Title </label>
                    <input className='md:w-[90%] w-[70%] focus:outline-none focus:border-2 focus:border-[#08292b] rounded-lg p-1 px-4 text-[#000] text-xl font-bold capitalize' type='text' id='title' {...register('title',{
                        required:{
                          value:true
                        },
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
                    <label htmlFor='summary' className='md:w-[24%] w-[17%] text-xl'><sup className='text-red-700 font-bold text-xl'>*</sup>Summary</label>
                    <input className='md:w-[90%] w-[70%] focus:outline-none focus:border-2 focus:border-[#08292b] rounded-lg p-1 px-4 text-[#000] text-xl' type='text' id='summary' {...register('summary',{
                      required:{
                        value:true
                      },
                      maxLength:{
                        value:350
                      }
                    })} 
                    autoComplete='off'
                    spellCheck='false'
                    placeholder='Blog Summary (Max 350 Chars)'/>
              </div>

              <div className='md:px-4 md:gap-7 w-full flex gap-24 h-10 items-center'>
                    <label htmlFor='file' className='md:w-[20%] w-[17%] text-xl'><sup className='text-red-700 font-bold text-xl'>*</sup>Cover</label>
                    <input className='text-xl text-[#2ed853] font-bold' type='file' id='file' {...register('image',{
                      required:{
                      value:true,
                      message:'*Required' 
                      }
                    })} />
                    <p className='text-xl text-red-700 font-bold'>{Object.keys(errors).includes('image') && errors.image?.message}</p>
              </div>

              <div className='md:px-4 h-72'>
                    <div className='md:w-[24%] w-[17%] text-xl mb-4'><sup className='text-red-700 font-bold text-xl'>*</sup>Description</div>
                    <ReactQuill onChange={changeContent} value={contentVal} className='max-h-[17rem] h-[85%] text-xl' modules={modules}/>
              </div>

              <button className='md:w-[50%] sm:mt-16 xs:mt-20 mt-9 capitalize rounded-lg font-bold bg-[#148f2eea] border border-[#2ed853] hover:bg-[#2ed85377] p-2 w-[25%] mx-auto transition duration-200 text-xl text-[#fff]'> Create Blog</button>
          </form>
        </>
        }
    </div>
  )
}
