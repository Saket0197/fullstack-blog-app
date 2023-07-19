import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Toaster } from 'react-hot-toast';
import CreateBlog from './pages/CreateBlog'
import ProtectedPage from './pages/ProtectedPage';
import useSession from './hooks/useSession';
import BlogPage from './pages/BlogPage';
import EditBlog from './pages/EditBlog';

export default function App() {

  const {isSessionValid} = useSession();

  useEffect(()=>{
    isSessionValid();
  },[]);

  return (
    <div className='md:py-0 overflow-x-hidden min-h-screen w-full py-2 bg-gradient-to-br from-[#020419] via-[#04021c] to-[#07021b] text-[#fff]'>
        <div className='md:w-[100%] md:p-0 w-[85%] overflow-x-hidden mx-auto p-2 bg-gradient-to-r from-[#020419] via-[#04021c] to-[#07021b]'>       
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element = {<HomePage/>} />
                    <Route path='register' element={<RegisterPage/>}/>
                    <Route path='login' element={<LoginPage/>} />
                    <Route path='create/:uid' element={<ProtectedPage><CreateBlog/></ProtectedPage>} />
                    <Route path='blog/:bid' element={<BlogPage/>} />
                    <Route path='edit/:bid' element={<ProtectedPage><EditBlog/></ProtectedPage>}/>
                </Route>
                <Route path='/*' element={<div>404 NOT Found</div>} />
            </Routes>
        </div>
        <Toaster/>
    </div>
  )
}