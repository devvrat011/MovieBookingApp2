import { useState,useEffect } from "react";
import context from "./context";

const ProviderState = ({ children }) => {
    const [id,setId]=useState();
    const [user, setUser] = useState(null);
    const [Movie, setMovie] = useState([]);
    const [clickid,setclickid] = useState();
    const [isusersignin,Setusersignin] = useState(false);
    const [isprofilename,Setprofilename] = useState("Profile");
    const [isAdmin,setAdmin] = useState(false);
    const [list,setList] = useState([]);
    const [movieData,setMovieData]=useState();
    const [theatreData,setTheatreData]=useState();
    
    const [loading,setLoading]=useState(true);
    const deleteItem=async(id) => {
      try {
        const response = await fetch(`http://localhost:8000/movie/${id}`, {
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json',
          },
        });
        const res="resources deleted";
        return res;
      }
      catch(e){
        console.log(e);
      }
    };

    const getMovie=async(id) => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/movie/${id}`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          },
        });
        const res = await response.json();
        setMovieData(res);
        setLoading(false);
        return res;
      }
      catch(e){
        console.log(e);
      }

    };

    const addShows = async (data) => {
      try {
          const response = await fetch('http://localhost:8000/show/add', {
              method: 'POST',
              headers: {
                  'content-type': 'application/json',
              },
              body: JSON.stringify(data),
          });
          const res = await response.json();
          return res;
      }
      catch(e) {
          console.log(e);
      }
  }
  const getShows = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/show/${id}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
      });
      const res = await response.json();
     return res;
    }
    catch(e){
      console.log(e);
    }
  }

  

    const addMovie=async(data)=>{
      try {
        const response = await fetch('http://localhost:8000/movie/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
    }
    catch (e) {
        console.log(e);
    }
    }

    const deleteTheatre=async(id)=>{
        const response = await fetch(`http://localhost:8000/theatre/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
       
    });
    const res = "resources deleted";
    }
    const updateUser=async(id,deletedUserData)=>{
      const updateUserResponse = await fetch(`http://localhost:8000/api/update/${id}`, {
                        method: 'PUT', 
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(deletedUserData),
      });  
      return updateUserResponse;
    }
    const AddTheatre=async(data)=>{
      try{
        const response = await fetch('http://localhost:8000/theatre/add', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });
      return await response.json();
      }
      catch(e){
        console.log(e);
      }
     
    }

    const updateTheatre = async(id,updatetheatredata) => {
        const updateTheatreResponse = await fetch(`http://localhost:8000/theatre/${id}`, {
              method: 'PUT', 
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatetheatredata),
        });  
        return updateTheatreResponse;
    }
    const updateMovie = async(id,updatemoviedata) => {
      const updateMovieResponse = await fetch(`http://localhost:8000/movie/${id}`, {
              method: 'PUT', 
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatemoviedata),
        });
        return updateMovieResponse;
    }
    const updateShow = async(id,updateShowdata) => {
      const updateShowResponse = await fetch(`http://localhost:8000/show/${id}`, {
              method: 'PUT', 
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updateShowdata),
        });
        return updateShowResponse;
    }
    const getTheatre=async(id)=>{
      try {
        // console.log(id);
        const response = await fetch(`http://localhost:8000/theatre/${id}`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          },
        });
        const res = await response.json();
        setTheatreData(res);
       return res;
      }
      catch(e){
        console.log(e);  
      }
    }
    useEffect( () => {
        const fetchUser = async () => {
          const token = localStorage.getItem('token');
          if(token) {
            const res = await fetch(`http://localhost:8000/api/getuser`, {
              headers: {
                'Content-type': 'application/json',
                token: token
              },
              method: 'POST',
            });
            const user = await res.json();
            if(!user) {
              localStorage.removeItem('token');
            }
            else {
              setUser(user);
              Setusersignin(true);
              Setprofilename(user.name);
              if(user.email === "devvratgupta123@gmail.com" || user.email=== "pratikgupta123@gmail.com"){
                setAdmin(true);
              }
            }
          }
        }
        fetchUser();
      }, []);
      useEffect(() => {
        setLoading(true);
        const User = async () => {
            try {
                const response = await fetch('http://localhost:8000/theatre', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const res = await response.json();
                setList(res);
                setLoading(false);
            }
            catch (e) {

            }
        }
        User();
    }, []);
    useEffect(()=>{
      const find=async()=>{
        setLoading(true);
        try {
          const response = await fetch('http://localhost:8000/movie', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
          });
          const res = await response.json();
          setMovie(res);
          setLoading(false);
        }
        catch(e){
          console.log(e);
        }
      }
      find();
    }, [])
    return (
        <context.Provider value={{updateShow,getTheatre,getShows,updateTheatre,updateMovie,theatreData,setclickid,clickid,setTheatreData,isusersignin, isAdmin, isprofilename, list,user,Movie,addMovie,deleteItem,getMovie,movieData,id,setId,loading,AddTheatre,updateUser,deleteTheatre,addShows}}>
            { children }
        </context.Provider>
    )
}

export default ProviderState;