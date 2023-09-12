import React from 'react'
import {useNavigate} from 'react-router-dom';
import Navbar from "../Navbars/Navbar";


function Home() {

  

  console.log(user);

  const navigate = useNavigate();
  const navigateToMovies = () => {
    navigate('/movies');
  }


  return (
    <div>
        <Navbar/>
        <button onClick={navigateToMovies}>
          <img src='https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/jawan-et00330424-1693892482.jpg' alt=''/>
        </button>
    </div>
  )
}

export default Home