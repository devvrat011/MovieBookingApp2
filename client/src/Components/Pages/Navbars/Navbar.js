import React from 'react'
import './Navbar.css';
import {useNavigate} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar({isusersignin,isprofilename,isAdmin}) {
    const navigate = useNavigate();
    const navigateToUser = () => {
        navigate('/user');
    }
    const navigateToProfile = () => {
        if(!isAdmin){
            navigateToUser();
        }
        else
        navigate('/admin');
    }
    const navigateToHome = () => {
        navigate('/');
    }
    const SignOuttoHome = () => {
        localStorage.removeItem('token');
        console.log("hello");
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



