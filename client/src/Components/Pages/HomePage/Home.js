import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom';
import Navbar from "../Navbars/Navbar";
import context from '../../../Context/context';
import { HStack, Skeleton} from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'


function Home() {
  

  const navigate = useNavigate();
  const {Movie,loading} = useContext(context);
  const navigateToMovies = (index) => {
    navigate(`/movies/${Movie[index]._id}`);
  }
  
  return (
    <div>
        <Navbar/>
        <HStack className='flex gap-4 justify-center my-4'>
          {
              Movie.map( (list,index) => {
                return (
                 
                    <div className=' rounded-xl border-black h-96 w-[22.5%]'>
                       {
                        loading ? (
                          <>
                            <Skeleton height='100%' bg='green.500' color='white' fadeDuration={3} />
                          </>
                        ) : (
                          <>
                            <Box>
                              <img className='h-[100%] w-[100%] hover:scale-105 cursor-pointer rounded-xl' src={list.url} onClick={()=>navigateToMovies(index)}/>
                            </Box>
                          </>
                        )
                       }
                    </div>
                )
              })
          }
        </HStack>
    </div>
  )
}

export default Home
