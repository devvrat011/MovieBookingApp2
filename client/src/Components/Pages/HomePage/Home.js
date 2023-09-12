import React,{useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import Navbar from "../Navbars/Navbar";
import { useEffect } from 'react';
import context from '../../../Context/context';


function Home() {
  
  const {user,fetchUser} = useContext(context);
  
  console.log(user);
  const navigate = useNavigate();
  const [isusersignin,Setusersignin] = useState(false);
  const [isprofilename,Setprofilename] = useState('Profile');
  const [isAdmin,setAdmin] = useState(false);

  const navigateToMovies = () => {
    navigate('/movies');
  }
  const navigateToLogin = () => {
    navigate('/login');
  }
  useEffect( () => {
   
    if(!fetchUser()){
      localStorage.removeItem('token');
       navigateToLogin();
    }
    else{
      Setusersignin(true);
          Setprofilename(user?.name);
          if(user?.email === "devvratgupta123@gmail.com" || user?.email=== "pratikgupta123@gmail.com"){
            setAdmin(true);
          }
          
    }
    
  })
  return (
    <div>
        <Navbar isusersignin={isusersignin} isprofilename={isprofilename} isAdmin = {isAdmin}/>
        <button onClick={navigateToMovies}>
          <img src='https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/jawan-et00330424-1693892482.jpg'/>
        </button>
    </div>
  )
}

export default Home