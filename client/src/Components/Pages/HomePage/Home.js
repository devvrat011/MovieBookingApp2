import React from 'react'
import {useNavigate} from 'react-router-dom';
import Navbar from '../Navbars/Navbar';

function Home() {
  const navigate = useNavigate();
  const navigateToMovies = () => {
    navigate('/movies');
  }
  
  return (
    <div>
        <Navbar/>
        <button onClick={navigateToMovies}>
          <img src='https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/fast-x-et00122562-1683110461.jpg'/>
        </button>
    </div>
  )
}

export default Home