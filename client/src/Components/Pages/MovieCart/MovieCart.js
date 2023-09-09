import React from 'react'
import "./MovieCart.css"
import {useNavigate} from 'react-router-dom';

function MovieCart() {
    const navigate = useNavigate();
    const NavigateToBookTicket = () => {
        navigate('/book');
    }
  return (
    <div>
        <div className='image_container'>
            <div className='image_container_main'>
                <img src='https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/jawan-et00330424-1693892482.jpg'/>
                
                <div className='image_container_text'>
                    
                    <div className='FastX'>
                        <h1><b>Fast X</b></h1>
                        <div class="text_size"><h2>⭐ 8.9/10</h2></div>
                        <div className="text_size rating">Add your rating
                        <button className='rating rating_button'>rate now</button>
                       
                        </div>
                        <div>
                        <div class="text_size">2D,3D,MX4D,3D SCREEN X</div>
                        <div class="text_size">MX4D 3D, ICE 3D,4DX</div>
                        </div>
                        <div class="text_size">English,Hindi</div>
                        <div class="text_size">2h 14m • Action,Adventure</div>
                        <a href='https://youtu.be/COv52Qyctws?si=ETAYDIRMZ60JAIDj' target='/' className='Trailer'><i>Watch Trailer</i></a>
                    </div>
                    <div>English,Hindi</div>
                    <div>2h 14m • Action,Adventure</div>
                    <button onClick={NavigateToBookTicket}>Book Tickets</button>
                </div>
            </div>
           
        </div>
        <div className='about_movie'>
            <h2>About the movie</h2>
            <br/>
            <div style={{fontSize: "1.1rem"}}>Dom Toretto and his family must confront a terrifying new enemy who`s fueled by revenge.</div>
        </div>
        <div className='cast_movie'>
            <h2>Cast</h2>
            
        </div>
    </div>
  )
}

export default MovieCart