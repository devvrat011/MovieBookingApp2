import React from 'react'
import "./MovieCart.css"

function MovieCart() {
  return (
    <div>
        <div className='image_container'>
            <div className='image_container_main'>
                <img src='https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/fast-x-et00122562-1683110461.jpg'/>
                <div className='image_container_text'>
                    <h2>Fast X</h2>
                    <div>⭐ 8.9/10</div>
                    <div>Add your rating and reviews</div>
                    <div>
                    <div>2D,3D,MX4D,3D SCREEN X</div>
                    <div>MX4D 3D, ICE 3D,4DX</div>
                    </div>
                    <div>English,Hindi</div>
                    <div>2h 14m • Action,Adventure</div>
                    <button>Book Tickets</button>
                </div>
            </div>
            <div>
                <div> Share</div>
            </div>
        </div>
        <div className='about_movie'>
            <h2>About the movie</h2>
            <br/>
            <div style={{fontSize: "1.1rem"}}>Dom Toretto and his family must confront a terrifying new enemy who`s fueled by revenge.</div>
        </div>
        <div className='cast_movie'>
            <h2>Cast</h2>
            <div></div>
        </div>
    </div>
  )
}

export default MovieCart