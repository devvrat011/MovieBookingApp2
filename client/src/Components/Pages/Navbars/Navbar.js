import React from 'react'
import './Navbar.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {useNavigate} from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const navigateToProfile = () => {
        navigate('/admin');
    }
    const navigateToHome = () => {
        navigate('/');
    }
    const navigateToLogin = () => {
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
            <div className='nav-loc' style={{cursor: "pointer"}}>
                <LocationOnIcon/>
            </div>
            <div className='nav-login' style={{cursor: "pointer"}}>
                <div onClick={navigateToLogin}>Sign In</div>
            </div>
        </div>
        <div className='nav-profile cursor-pointer' onClick={navigateToProfile}>
            Profile
        </div>
    </div>
  )
}

export default Navbar



