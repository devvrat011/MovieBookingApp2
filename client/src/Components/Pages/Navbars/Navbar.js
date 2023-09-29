import React from 'react'
import './Navbar.css';
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import context from '../../../Context/context';

function Navbar() {
    const navigate = useNavigate();
    let { isusersignin, isprofilename,isAdmin } = useContext(context);
    const navigateToUser = () => {
        navigate('/user');
    }
    const navigateToProfile = () => {
        if(!isAdmin && isusersignin){
            navigateToUser();
        }
        else if(isusersignin)
        navigate('/admin');
        else{
            alert("Sign In first");
            navigateToLogin();
        }
    }
    const navigateToHome = () => {
        navigate('/');
    }
    const SignOuttoHome = () => {
        localStorage.removeItem('token');
        navigateToHome();
        window.location.reload();
    }
    const navigateToLogin = () => {
        if(isusersignin){
            isusersignin = false;
            SignOuttoHome();
        }
        else
        navigate('/login');
    }
  return (
    <div className='navbar'>
        <div className='nav-logo cursor-pointer' onClick={navigateToHome}>
            <span>Cinematic</span>
        </div>
        <div className='nav-content w-[55%]'>
            <input className='nav-box text-black ' type = 'text' placeholder='Type to search...'/>
        </div>
        <div className='nav-profile cursor-pointer flex gap-10'>
            <div className='nav-login items-center' onClick={navigateToLogin}>{(isusersignin) ? <span className=''><LogoutIcon/> Sign Out</span> : <span><LoginIcon/> Sign In</span>}</div>
           <div className='flex gap-2 nav-profile-icon items-center' onClick={navigateToProfile}>
                <AccountCircleIcon/>
                <div className='flex-col'>
                        {(isAdmin) ? <span>Admin</span>
                        :
                        <div>{isprofilename}</div>}
                </div>
           </div>
        </div>
    </div>
  )
}

export default Navbar



