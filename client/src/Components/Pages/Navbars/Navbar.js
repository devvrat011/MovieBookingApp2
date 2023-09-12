import React from 'react'
import './Navbar.css';
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
            <h2>Cinematic</h2>
        </div>
        <div className='nav-search'>
            <input className='nav-box text-black' type = 'text' placeholder='Type to search...'/>
        </div>
        <div className='nav_loc_login'>
            <div className='nav-login ' style={{cursor: "pointer"}}>
                <div onClick={navigateToLogin}>{(isusersignin) ? "Sign Out" : "Sign In"}</div>
            </div>
        </div>
        <div className='nav-profile cursor-pointer flex gap-3' onClick={navigateToProfile}>
           <AccountCircleIcon/> 
           <div className='flex-col'>
                <div>
                    {(isAdmin) ? "Admin" : ""}
                </div> 
                <div>
                    {isprofilename}
                </div>
           </div>
        </div>
    </div>
  )
}

export default Navbar



