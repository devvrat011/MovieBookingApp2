import { useState,useEffect } from "react";
import context from "./context";

const ProviderState = ({ children }) => {
    const [id,setId]=useState();
    const [user, setUser] = useState(null);
    const [Movie, setMovie] = useState([]);
    const [isusersignin,Setusersignin] = useState(false);
    const [isprofilename,Setprofilename] = useState("Profile");
    const [isAdmin,setAdmin] = useState(false);
    const [list,setList] = useState([]);
    const [movieData,setMovieData]=useState();
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
      }
      catch(e){
        console.log(e);
      }

    };


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
        // console.log(res);
    }
    catch (e) {
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
        <context.Provider value={{ isusersignin, isAdmin, isprofilename, list,user,Movie,addMovie,deleteItem,getMovie,movieData,id,setId,loading}}>
            { children }
        </context.Provider>
    )
}

export default ProviderState;