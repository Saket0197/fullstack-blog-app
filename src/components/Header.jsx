import React, { useContext } from 'react';
import logo from '../Assets/HeaderLogo.jpg';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../context/ContextProvider';
import {toast} from 'react-hot-toast';
import CreateBtn from './Buttons/CreateBtn';
import SignupBtn from './Buttons/SignupBtn';
import LogoutBtn from './Buttons/LogoutBtn';
import LoginBtn from './Buttons/LoginBtn';

export default function Header() {

  const location = useLocation();
  const path = location.pathname;
  // const currentRoute = location.pathname.includes('/register') || location.pathname.includes('/login');

  const{isLoggedIn, setLoggedIn, userInfo,setUserInfo} = useContext(UserContext);
  function handleLogout() {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    if(sessionStorage.getItem('formValuesCreate')) {
      sessionStorage.removeItem('formValuesCreate');
    }
    if(sessionStorage.getItem('formValuesEdit')){
      sessionStorage.removeItem('formValuesEdit');
    }
    setUserInfo(null);
    setLoggedIn(false);
    toast.success('Logout Successful');
  }

  return (
    <nav className='md:border-0 md:rounded-none md:px-2 flex justify-between text-lg font-semibold mb-2 border border-[#ffffff69] p-2 rounded-lg bg-[#1ebe3356]'>
        <div className='flex justify-between items-center'>
          <NavLink to={'/'}>
            <img src={logo} alt='Header logo' width={70} className='md:w-[55px]'/>
          </NavLink>
          <p className='md:text-lg md:pt-1 md:px-1 md:flex md:items-center select-none bg-indigo-600 h-full text-xl pt-2 px-2 w-fit text-center'>Blogs</p>
        </div>
        
        <div className='md:gap-2 flex justify-between w-fit items-center gap-11 px-1'>
            {
              (!isLoggedIn && !userInfo) 
              ? 
                (path === '/register' && <LoginBtn/>)  || (path === '/login' && <SignupBtn/>) || <><SignupBtn/><LoginBtn/></> 
              :
                (path === '/' && 
                <>
                  <CreateBtn userid={userInfo.id}/>
                  <LogoutBtn handleLogout={handleLogout} username={userInfo.username} />
                </>) 
              || 
                ((path.includes('/create/') || path.includes('/blog/') || path.includes('/edit/')) && 
                <>
                  <LogoutBtn handleLogout={handleLogout} username={userInfo.username} />
                </>)
            }
        </div>
    </nav>
  )
}
