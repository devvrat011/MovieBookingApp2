import React from 'react'
import './Navbar.css';
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ExploreIcon from '@mui/icons-material/Explore';
import context from '../../../Context/context';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import CloseIcon from "@mui/icons-material/Close";
import Map from '../MapShow/map';
function Navbar() {
    const navigate = useNavigate();
    let { isusersignin, isprofilename,isAdmin } = useContext(context);
    const [open, setOpen] = useState(false);
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
    const closeModal = () => {
        setOpen(o => !o);
      }
  return (
    <div className='navbar'>
        <div className='nav-logo cursor-pointer' onClick={navigateToHome}>
            <span>Cinematic</span>
        </div>
        <div className='nav-content w-[55%]'>
            <input className='nav-box text-black ' type = 'text' placeholder='Type to search...'/>
        </div>
        <div className='w-10 h-10 text-whitebg-whi' >
          <div onClick={()=>setOpen(true)}><ExploreIcon style={{color: "white",width:"100%",height:"100%",cursor:"pointer"}}/></div>
        <Popup open={open} closeOnDocumentClick onClose={closeModal}   modal nested>
        {
          close => (
   
            <div className='flex gap-4 w-[100%]  md:w-[100%] flex-col p-10 mx-auto bg-white rounded-2xl shadow-lg'>
              <div className="absolute left-[90%] top-[4%]">
                <div></div>
                <button onClick=
                  {() => {
                    close();
                  }}>
                  <CloseIcon style={{ color: "grey" }} />
                </button>
              </div>
              <div >
                  <Map/>
              </div>
             
              {/* <div className="h-1.5 bg-gray-500 rounded-br-[900%] rounded-bl-[900%]"></div> */}
             
            </div>
            
          )
        }
      </Popup>
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



