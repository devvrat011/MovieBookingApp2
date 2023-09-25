import React, { useContext, useEffect } from 'react'
import "./MovieCart.css"
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbars/Navbar';
import { useParams } from 'react-router-dom';
import context from '../../../Context/context';
import {Box, Skeleton, Stack} from '@chakra-ui/react';

function MovieCart() {
    const navigate = useNavigate();
    const NavigateToBookTicket = () => {
        navigate(`/book/${id}`);
    }
    const { id } = useParams();
    const { getMovie, movieData, loading } = useContext(context);
    useEffect(() => {
        getMovie(id);
    }, []);
    
    return (
        <div>
            <Navbar/>
            <div className={loading?"image_removed":"image_container"}>
                <div className='image_container_main'>
                    {
                        loading ? (
                            <>
                                <Skeleton height='400px' width="45%" bg='green.500' color='white' fadeDuration={1} />
                            </>
                        ): (
                            <div className='h-[30%] w-[45%]'>
                                <img src={movieData?.url} />
                            </div>
                        )
                    }
                    <div className='image_container_text'>
                        <div className='FastX'>
                            {
                                loading ? (
                                    <Skeleton style={{marginBottom: "5px"}} height='40px' width="70%" fadeDuration={1} />
                                ): (
                                    <h1><b>{movieData?.name}</b></h1>
                                )
                            }
                            {
                                loading ? (
                                    <Skeleton style={{marginBottom: "5px"}} height='40px' width="50%" fadeDuration={1} />
                                ): (
                                    <div class="text_size"><h2>⭐ 8.9/10</h2></div>
                                )
                            }
                            {
                                loading ? (
                                    <Skeleton style={{marginBottom: "5px"}} height='60px' width="120%" fadeDuration={1} />
                                ): (
                                    <div className="text_size rating">Add your rating
                                        <button className='rating rating_button'>rate now</button>
                                    </div>
                                )
                            }
                            {
                                loading ? (
                                    <Skeleton style={{marginBottom: "5px"}} height='50px' width="100%" fadeDuration={1} />
                                ): (
                                    <div>
                                        <div class="text_size">2D,3D,MX4D,3D SCREEN X</div>
                                        <div class="text_size">MX4D 3D, ICE 3D,4DX</div>
                                    </div>
                                )
                            }
                            {
                                loading ? (
                                    <Skeleton style={{marginBottom: "5px"}} height='25px' width="40%" fadeDuration={1} />
                                ): (
                                    <div class="text_size">{movieData?.language}</div>
                                )
                            }
                            {
                                loading ? (
                                    <Skeleton style={{marginBottom: "5px"}} height='25px' width="80%" fadeDuration={1} />
                                ): (
                                    <div class="text_size">2h 14m • Action,Adventure</div>
                                )
                            }
                            {
                                loading ? (
                                    <Skeleton style={{marginBottom: "5px"}} height='35px' width="60%" fadeDuration={1} />
                                ): (
                                    <a href='https://youtu.be/COv52Qyctws?si=ETAYDIRMZ60JAIDj' target='/' className='Trailer'><i>Watch Trailer</i></a>
                                )
                            }
                        </div>
                        {
                            loading ? (
                                <Skeleton style={{marginBottom: "4px"}} height='35px' width="60%" fadeDuration={1} />
                            ): (
                                <div>{movieData?.duration} • {movieData?.genre}</div>
                            )
                        }
                        <button onClick={NavigateToBookTicket} >Book Tickets</button>
                    </div>
                </div>
            </div>
            <div className='about_movie'>
                <Skeleton isLoaded={!loading} height='25px' width="45%" color='black' fadeDuration={1}>
                    <Box>
                        <h2 style={{ fontSize: "1.2rem"}}>About the movie</h2>
                    </Box>
                </Skeleton>
                <br/>
                <Skeleton isLoaded={!loading} height='25px' width="45%" color='black' fadeDuration={1}>
                    <Box>
                        <div style={{ fontSize: "1.1rem" }}>{movieData?.description}</div>
                    </Box>
                </Skeleton>
            </div>
        </div>
    )
}

export default MovieCart